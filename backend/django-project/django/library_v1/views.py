from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from library_v1.serializers import (BookSerializer, AuthorBooksListSerializer)
from library.models import Book
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from dj_rest_auth.jwt_auth import JWTCookieAuthentication
from auth_app_v1.models import User
from django.contrib.auth import get_user_model
User = get_user_model()
class BooksList(APIView):
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        books = Book.objects.all()
        serializers = BookSerializer(books, many=True, context={"request": request})
        return Response(serializers.data)
    
class BookDetails(APIView):
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        book = get_object_or_404(Book, pk=pk)
        serializer = BookSerializer(book, context={"request": request})
        print("nice")
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class BookCreate(APIView):
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class BookUpdate(APIView):
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticated]
    def patch(self, request, pk):
        book = get_object_or_404(Book, pk=pk)
        serializer = BookSerializer(book, data=request.data, partial=True)
        if book.author == request.user:
            if serializer.is_valid():
                serializer.save(author=self.request.user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

class BookDelete(APIView):
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticated]
    def delete(self, request, pk):
        book = Book.objects.get(pk=pk)
        if book.author == request.user:
            book.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

class AuthorBooksList(APIView):
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, name):
        author = get_object_or_404(self.User, name=name)
        books = Book.objects.filter(author=author)
        serializer = AuthorBooksListSerializer(books, many=True, )
        print(serializer.data)
        return Response(serializer.data)
        