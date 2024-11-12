from django.db import models
from django.contrib.auth.hashers import make_password
import random
import string
from django.core.exceptions import ValidationError
import hashlib

class Role(models.Model):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('admin', 'Admin'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, unique=True)

    def __str__(self):
        return self.role

class Passphrase(models.Model):
    user = models.OneToOneField('User', related_name='user_passphrase', on_delete=models.CASCADE)
    passphrase = models.CharField(max_length=4, blank=True, null=True)

    def save(self, *args, **kwargs):
        # Only generate a passphrase if it is not already set
        if not self.passphrase:
            self.passphrase = ''.join(random.choices(string.ascii_uppercase, k=4))  # Generate a random 4-letter passphrase
        super().save(*args, **kwargs)

    def __str__(self):
        return self.passphrase

class User(models.Model):
    email = models.EmailField(unique=True)
    fname = models.CharField(max_length=100)
    password = models.CharField(max_length=255)  # Store hashed passwords
    phone = models.CharField(max_length=15)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, related_name='users')

    def save(self, *args, **kwargs):
        # Hash the password if it isn't hashed
        if not self.password.startswith("pbkdf2_"):
            self.password = make_password(self.password)

        # Assign default 'user' role if not set
        if self.role is None:
            self.role, created = Role.objects.get_or_create(role='user')

        # Save the user object first to ensure it has a primary key
        super().save(*args, **kwargs)

        # Now create a Passphrase related to the user if it doesn't already exist
        if not hasattr(self, 'user_passphrase'):
            Passphrase.objects.create(user=self)  # Automatically generates a 4-letter passphrase

    def __str__(self):
        return self.email
