from rest_framework import serializers
from .models import User, Role, Passphrase
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password

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
