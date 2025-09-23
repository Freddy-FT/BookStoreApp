from django.contrib.auth import (
    get_user_model,
)

from auth_app_v1.models import User

from django.db import transaction
from django.utils.text import slugify
from dj_rest_auth.registration.serializers import RegisterSerializer

from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ["email", "password", "name", "public_name"]
        extra_kwargs = {"password": {"write_only": True, "min_length":5}}

    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)
    
    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user

class CustomRegisterSerializer(RegisterSerializer):
    public_name = serializers.CharField(max_length=255)
    name = serializers.CharField(max_length=150)

    def __init__(self, *args, **kwargs):
        print("✅ CustomRegisterSerializer loaded")
        super().__init__(*args, **kwargs)
        self.fields.pop('username', None) 

    def validate_email(self, value):
        if get_user_model().objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
    
    

    def validate_name(self, value):
        slug = slugify(value)
        if get_user_model().objects.filter(name=slug).exists():
            raise serializers.ValidationError("A user with this Display Name already exists.")
        return slug

    def validate_public_name(self, value):
        if get_user_model().objects.filter(public_name=value).exists():
            raise serializers.ValidationError("A user with this Username already exists.")

    def get_cleaned_data(self):
        return {
            'email': self.validated_data.get('email', ''),
            'password1': self.validated_data.get('password1', ''),
            'name': self.validated_data.get('name', ''),
            'public_name': self.validated_data.get('public_name', ''),
        }

    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.name = self.validated_data.get('name')
        user.public_name = self.validated_data.get('public_name')
        user.save()
        return user
 
class PublicUserDetails(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["public_name", "name", "registration_date"]

class PrivateUserDetails(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["public_name", "name", "registration_date", "email", "is_staff", "is_superuser" ]