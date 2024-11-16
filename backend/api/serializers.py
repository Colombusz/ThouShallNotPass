
from rest_framework import serializers
from .models import User, Role, Passphrase, Account, Password, Analysis
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
import bcrypt
import math


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['role']

class PassphraseSerializer(serializers.ModelSerializer):
    original_passphrase = serializers.SerializerMethodField()

    class Meta:
        model = Passphrase
        fields = ['passphrase', 'original_passphrase']

    def get_original_passphrase(self, obj):
        return getattr(obj, '_original_passphrase', None)

class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    passphrase = PassphraseSerializer(source='user_passphrase', read_only=True)  # Updated to use 'user_passphrase'
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'fname', 'password', 'phone', 'role', 'passphrase']

    def create(self, validated_data):
        user = super().create(validated_data)
        if hasattr(user, '_original_passphrase'):
            user.passphrase = user._original_passphrase
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    passphrase = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        passphrase = data.get('passphrase')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password.")

        # Validate the password using bcrypt
        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            raise serializers.ValidationError("Invalid email or password.")

        # Check the passphrase
        if not user.user_passphrase or not bcrypt.checkpw(passphrase.encode('utf-8'), user.user_passphrase.passphrase.encode('utf-8')):
            raise serializers.ValidationError("Invalid passphrase.")

        # Generate tokens for the user if authentication is successful
        refresh = RefreshToken.for_user(user)
        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)
        data["user_id"] = user.id
        data["role"] = user.role.role

        return data

class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Password
        fields = ['password']

class AccountSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    password = PasswordSerializer(read_only=True)
    class Meta:
        model = Account
        fields = ['name', 'description', 'username', 'password_id', 'user_id']

class AnalysisSerializer(serializers.ModelSerializer):
    password = PasswordSerializer(read_only=True)
    class Meta:
        model = Analysis
        fields = ['entropy', 'estimated_cracking_time', 'remarks', 'password_id']

class PasswordHasher(serializers.ModelSerializer):
    class Meta:
        model = Password
        fields = ['password']

    def validate(self, data):
        # Retrieve the password from the input data
        password = data.get('password')

        # Check if the password is empty before proceeding with hashing
        if not password:
            raise serializers.ValidationError("Password cannot be empty.")
        
        # Return the validated data
        return data

    def hash(self, data, account_id):
        # Extract the password from the data
        password = data.get('password')

        # Check if the password is provided
        if not password:
            raise serializers.ValidationError("Password cannot be empty.")

        # Hash the password using bcrypt
        hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Create a Password instance and associate it with the account_id
        paso = Password(password=hashed_pw, account_id=account_id)

        # Save the Password instance to the database
        paso.save()

        return paso  # Return the Password instance (optional)

# This will be used for the Entropy calculation
def calculate_entropy(password):
    """Calculate password entropy in bits."""
    length = len(password)
    pool_size = 0

    # Estimate pool size based on character types
    if any(c.islower() for c in password): pool_size += 26
    if any(c.isupper() for c in password): pool_size += 26
    if any(c.isdigit() for c in password): pool_size += 10
    if any(c in '!@#$%^&*()-_=+[]{};:,.<>/?' for c in password): pool_size += 32  # Special chars

    # Entropy formula: length * log2(pool_size)
    entropy = length * math.log2(pool_size) if pool_size > 0 else 0
    return entropy

class CreateAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['name', 'description', 'username']
    
    def validate(self, data):
        return data
    
    def createAcc(self, data):
        
        name = data['name']
        description = data['description']
        username = data['username']
        psw = PasswordHasher()
        # psw = psw.hash(data['password'], 1)
        # return psw
        # password = data['password']['password']
    
   
        
        # if Account.objects.filter(username=username).exists():
            # raise serializers.ValidationError("Username must be unique.")

       
        account = Account(
            name=name,
            description=description,
            username=username,
            user_id="1", # for debugging purposes only
            # user_id=self.context['request'].user,
        )
        account.save()
        # return account
        acc_id = account.id
        psw = psw.hash(data['password'], acc_id)
        # return psw
        # return data['password']
        
        return "Account created successfully."