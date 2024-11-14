from django.urls import path
from .views import UserCreateView, UserListView, LoginView, AccountView, UserDeleteView, UserUpdateView

urlpatterns = [
    path('users/register', UserCreateView.as_view(), name='user-create'),  # for creating users via POST
    path('users/list', UserListView.as_view(), name='user-list'),  # for listing users via GET
    path('users/update/<int:pk>', UserUpdateView.as_view(), name='user-update'),  # for updating a user via PUT/PATCH
    path('users/delete/<int:pk>', UserDeleteView.as_view(), name='user-delete'),  # for deleting a user via DELETE
    path('users/login', LoginView.as_view(), name='login'),  # for logging in users via POST
    path('users/account', AccountView.as_view(), name='account-view'),  # for getting account details via GET 
]

