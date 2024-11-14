# Description: Views for the users app.

from rest_framework import generics
from .models import User, Role, Account, Passphrase, Password, Analysis
from .serializers import UserSerializer, LoginSerializer, CreateAccountSerializer, PasswordSerializer, AccountSerializer

# for login process
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# for delete purposes
import time
from django.db import transaction, OperationalError


# class UserCreateView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     def perform_create(self, serializer):
#         # Fetch the 'user' role or create it if it doesn't exist
#         role, created = Role.objects.get_or_create(role='user')
#         user = serializer.save(role=role)
#         # The passphrase is automatically created through the User model's save method


##Frontend Registration connected
# register/create user
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        # Assign 'user' role by default
        role, created = Role.objects.get_or_create(role='user')
        user = serializer.save(role=role)
        
        # Fetch the passphrase generated for this user
        passphrase = user.user_passphrase.passphrase
        
        # Send passphrase as part of the response
        return Response({
            "user": UserSerializer(user).data,
            "passphrase": passphrase  # Include passphrase here
        }, status=status.HTTP_201_CREATED)
        

#read/display user
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
        

# for querying existing accounts of the current user
class AccountView(generics.ListAPIView):
    def post(self, request):
        serializer = CreateAccountSerializer(data = request.data)
        if serializer.is_valid():
           return Response(serializer.validated_data, status=status.HTTP_200_OK)
       
        

class FetchAccountView(generics.RetrieveAPIView):
    def get_queryset(self):
        user = self.request.user
        if user is not None:
            return Response(Account.objects.filter(user=user), status=status.HTTP_200_OK)
        else:
            return Response({"detail": "No accounts found for the user."}, status=status.HTTP_200_OK)
            
        
        