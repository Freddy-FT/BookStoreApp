from dj_rest_auth.registration.views import RegisterView
from auth_app_v1.serializers import CustomRegisterSerializer
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from auth_app_v1.serializers import (PublicUserDetails, PrivateUserDetails)
from auth_app_v1.models import User
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from dj_rest_auth.jwt_auth import JWTCookieAuthentication

class CustomRegisterView(RegisterView):
    
    serializer_class = CustomRegisterSerializer

    def get_serializer_class(self):
        print("✅ Using CustomRegisterSerializer")
        return self.serializer_class
    
class AuthorDetails(APIView):
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, name):
        author = get_object_or_404(User, name=name)
        if author.id == request.user.id:
            serializer = PrivateUserDetails(author)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            serializer = PublicUserDetails(author)
            #serializer = PrivateUserDetails(author)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
