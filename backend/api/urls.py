from django.urls import path
from .views import UserCreateView, UserListView
from .views import LoginView

urlpatterns = [
    path('users/register', UserCreateView.as_view(), name='user-create'),  # for creating users via POST
    path('users/list', UserListView.as_view(), name='user-list'),  # for listing users via GET
    path('users/login', LoginView.as_view(), name='login'),  # for logging in users via POST
]

