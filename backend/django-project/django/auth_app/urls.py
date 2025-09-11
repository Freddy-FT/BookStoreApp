from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('v1/', include('auth_app_v1.urls') ),
]
