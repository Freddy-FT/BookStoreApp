from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.registration.views import VerifyEmailView
from django.urls import path
urlpatterns = [
    path(
        'dj-rest-auth/account-confirm-email/',
        VerifyEmailView.as_view(),
        name='account_email_verification_sent'
    ),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/',include('dj_rest_auth.registration.urls'),),
    path('dj-rest-auth/registration/verify-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
]    #path('registration/', CustomRegisterView.as_view(), name='custom_registration'),