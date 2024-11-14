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
    class Meta:
        model = Passphrase
        fields = ['passphrase']
class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    passphrase = PassphraseSerializer(source='user_passphrase', read_only=True)  # Updated to use 'user_passphrase'
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'fname', 'password', 'phone', 'role', 'passphrase']
        
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

        if not check_password(password, user.password):
            raise serializers.ValidationError("Invalid email or password.")

        # Check the passphrase with user.user_passphrase.passphrase
        if not user.user_passphrase or user.user_passphrase.passphrase != passphrase:
            raise serializers.ValidationError("Invalid passphrase.")

        refresh = RefreshToken.for_user(user)
        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)
        data["user_id"] = user.id

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

    def hash(self, password):
        # Only hash the password, no saving
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


# This will be used for the Entropy mah meeeeeeen
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
        fields = ['name', 'description', 'username', 'password_id']
    
    def validate(self, data):
        name = data.get('name')
        description = data.get('description')
        username = data.get('username')
        password = data.get('password')

       
        if Account.objects.filter(username=username).exists():
            raise serializers.ValidationError("Username must be unique.")
        
       
        password_hasher = PasswordHasher()
        hashed_password = password_hasher.hash(password)

        
        password_instance = Password.objects.create(password=hashed_password)

        
        account = Account(
            name=name,
            description=description,
            username=username,
            user=self.context['request'].user,
            password=password_instance 
        )
        account.save()

        return data

