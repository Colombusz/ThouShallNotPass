from django.db import models
from django.contrib.auth.hashers import make_password
import random
import string
from django.core.exceptions import ValidationError
import hashlib
import bcrypt

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
        # Hash the password using bcrypt if it isn't hashed
        if not self.password.startswith("$2b$"):
            self.password = bcrypt.hashpw(self.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

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
    
    
class Password(models.Model):
    password = models.CharField(max_length=255)
    def save(self, *args, **kwargs):
       
        if not self.password.startswith('pbkdf2_'):  
            self.password = make_password(self.password)
        super(Account, self).save(*args, **kwargs)
    
    def __str__(self):
        return self
            
class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='accounts')
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.OneToOneField(Password, on_delete=models.CASCADE, related_name='accounts')
    
    def __str__(self):
        return self
    
    
    
class Analysis(models.Model):
    password = models.OneToOneField(Password, on_delete=models.CASCADE, related_name='analysis')
    entropy = models.FloatField(null=True, blank=True)
    estimated_cracking_time = models.CharField(max_length=100, null=True, blank=True)
    remarks = models.CharField(max_length=100)
    
    def __str__(self):
        return self
