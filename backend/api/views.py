

# Description: Views for the users app.

from rest_framework import generics
from .models import User, Role, Account, Passphrase, Password, Analysis
from .serializers import UserSerializer, LoginSerializer, CreateAccountSerializer, PasswordHasher, AccountSerializer, DeleteAccountSerializer, UpdateAccountSerializer
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from rest_framework.parsers import MultiPartParser, FormParser

# for login process
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# register/create user
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        # Assign 'user' role by default
        role, created = Role.objects.get_or_create(role='user')
        user = serializer.save(role=role)
        
        # Fetch the original passphrase generated for this user
        original_passphrase = getattr(user, '_original_passphrase', None)
        
        # Send passphrase as part of the response
        return Response({
            "user": UserSerializer(user).data,
            "passphrase": original_passphrase  # Include original passphrase here
        }, status=status.HTTP_201_CREATED)

# read/display user
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# update user
class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

# delete user
class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            # Log the validated email, as mentioned in your debug message
            print(f"[DEBUG] Login data validated for email: {serializer.validated_data['email']}")
            # Return a Response with the validated data
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        # Return a Response with errors if validation fails
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# for creating existing accounts of the current user
class AccountView(generics.ListAPIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, pk, format=None):
        serializer = CreateAccountSerializer(data=request.data)
        serializer2 = PasswordHasher(data=request.data)
        user_id = pk
        if serializer.is_valid() and serializer2.is_valid():
            data = serializer.validated_data
            password = serializer2.validated_data
            data['password'] = password

            if not user_id:
                return Response({"User doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)
            
            result = serializer.createAcc(data, pk)
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "No accounts found for the user."}, status=status.HTTP_400_BAD_REQUEST)

class FetchAccountView(generics.ListAPIView):
    def get(self, request, pk):
        # user_data = self.request.data
        user_id = pk 

        if user_id is not None:
        
            accounts = Account.objects.filter(user_id=user_id).prefetch_related('passwords')

            if accounts.exists():
                all_account_data = []

                for account in accounts:
                    
                    account_data = AccountSerializer(account).data

                    passwords = account.passwords.all().values('id', 'password')
                    account_data['passwords'] = list(passwords)

                    # Append to the list of all accounts
                    all_account_data.append(account_data)

                # Return the data for all accounts
                return Response(all_account_data, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "No accounts found for the given user ID."}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"detail": "User ID not provided."}, status=status.HTTP_400_BAD_REQUEST)
        
class DeleteAccountView(APIView):
    def delete(self, request, pk, *args, **kwargs):
        # Create a serializer instance and call the bura method
        serializer = DeleteAccountSerializer()
        result = serializer.bura(pk)
        return Response({"message": result}, status=status.HTTP_200_OK)
    
class UpdateAccountView(APIView):
    def put(self, request, pk, *args, **kwargs):
        serializer = CreateAccountSerializer(data = request.data)
        serializer2 = PasswordHasher(data = request.data)
        execute = UpdateAccountSerializer()
        Acc_id = pk
        
        # return Response(data = request.data, status=status.HTTP_200_OK)
        if serializer.is_valid() and serializer2.is_valid():
            password = serializer2.validated_data.get('password')
            data = serializer.validated_data
            
        else:
            return "Invalid data provided."
            
        return Response(result = execute.update(Acc_id, data, password), status=status.HTTP_200_OK)
            