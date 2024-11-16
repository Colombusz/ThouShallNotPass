from django.urls import path
from .views import UserCreateView, UserListView, LoginView, AccountView, UserDeleteView, UserUpdateView, FetchAccountView,DeleteAccountView, UpdateAccountView

urlpatterns = [
    # userlogin handler ===================================================================================================
    path('users/register', UserCreateView.as_view(), name='user-create'),  # for creating users via POST
    path('users/login', LoginView.as_view(), name='login'),  # for logging in users via POST
    # userlogin handler end ===================================================================================================
    
    
    # account handler ===================================================================================================
    path('users/CreateAccount/<int:pk>', AccountView.as_view(), name='account-view'),  
    path('users/FetchAccount/<int:pk>', FetchAccountView.as_view(), name='account-fetch'),
    path('users/DeleteAccount/<int:pk>', DeleteAccountView.as_view(), name='account-Delete'),
    path('users/UpdateAccount/<int:pk>', UpdateAccountView.as_view(), name='account-Update'),
    
    # account handler end ===================================================================================================
    
    
    
    # analysis handler ===================================================================================================
    # path('users/DeleteAccount/<int:pk>', DeleteAccountView.as_view(), name='account-Delete'),
    # analysis handler end ===================================================================================================
    
    
    
    # admin handler ===================================================================================================
    # 
    # 
    # 
    ########## For managing users ===================================================================================================
    path('users/list', UserListView.as_view(), name='user-list'),  # for listing users via GET
    path('users/update/<int:pk>', UserUpdateView.as_view(), name='user-update'),  # for updating a user via PUT/PATCH
    path('users/delete/<int:pk>', UserDeleteView.as_view(), name='user-delete'),  # for deleting a user via DELETE
    ########## For managing users end ===================================================================================================
    #
    #
    #
    # admin handler end ===================================================================================================
]

