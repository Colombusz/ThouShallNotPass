
from rest_framework import serializers
from .models import User, Role, Passphrase, Account, Password, Analysis
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
import bcrypt
import math
from .analysis import calculate_entropy, remarks, estimate_cracking_time


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
        fields = '__all__'

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

        return paso 


class AnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analysis
        fields = ['entropy', 'estimated_cracking_time', 'remarks', 'password_id']
    
    def analyze(self, id, password):
        entropy = calculate_entropy(password)
        cracking_time = estimate_cracking_time(entropy, password)
        states = remarks(password)
        password_id = id
        
        analysis = Analysis(
            entropy=entropy,
            estimated_cracking_time=cracking_time,
            remarks=states,
            password_id=password_id,
        )
        analysis.save()
        
        return analysis

class CreateAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['name', 'description', 'username', 'url']
    
    def validate(self, data):
        return data
    
    def createAcc(self, data, id):
        
        name = data['name']
        description = data['description']
        username = data['username']
        Acc_url = data['url']
       
        if not id:
           return False
        psw = PasswordHasher()
        
        lyze = AnalysisSerializer()
        account = Account(
            name=name,
            description=description,
            username=username,
            user_id = id, # fixed
            url=Acc_url,
            # user_id=self.context['request'].user,
        )
         # Check if URL exists
        existing_account = Account.objects.filter(url=Acc_url).first()
        if existing_account:
        # URL exists, check if username matches
            if existing_account.username == username:
                return "An account with this URL and username already exists Please Change your username"
        account.save()
        # return account
        acc_id = account.id
        psw = psw.hash(data['password'], acc_id)
        psw_id = psw.id
        
        lyze.analyze(psw_id, data['password'].get('password'))
        # return psw
        # return data['password']
        
        return "Account created successfully."


class DeleteAccountSerializer(serializers.ModelSerializer):
    def bura(self, pk):    
        try:
            account = Account.objects.get(id=pk)
            pwd = Password.objects.get(account_id=account.id)
            analysis = Analysis.objects.get(password_id=pwd.id)
            
            # Delete in reverse dependency order
            analysis.delete()
            pwd.delete()
            account.delete()
            
            return "Account deleted successfully."
        except Account.DoesNotExist:
            return "Account not found."
        except Password.DoesNotExist:
            return "Password not found."
        except Analysis.DoesNotExist:
            return "Analysis not found."


class UpdateAccountSerializer(serializers.ModelSerializer):
    def update(self, id, data, password):
        account = Account.objects.get(id=id)
        account.name = data['name']
        account.description = data['description']
        account.username = data['username']
        account.url = data['url']
        account.save()
        
        password = Password.objects.get(account_id=id)
        password.password = bcrypt.hashpw(data['password'].get('password').encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        analysis = Analysis.objects.get(password_id=password.id)
        analysis.entropy = calculate_entropy(data['password'].get('password'))
        analysis.estimated_cracking_time = estimate_cracking_time(analysis.entropy, data['password'].get('password'))
        analysis.remarks = remarks(data['password'].get('password'))
        return "Your account has been updated successfully."
        

   
    
    