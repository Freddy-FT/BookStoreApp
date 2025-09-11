from rest_framework import serializers
from library.models import Book

class BookSerializer(serializers.ModelSerializer):
    author_public_name = serializers.SerializerMethodField()
    author_name = serializers.SerializerMethodField()
    class Meta:
        model = Book
        fields = ["id","title","author","author_public_name","author_name","description","release_date"]
        read_only_fields = ["author"]
    def get_author_public_name(self, obj):
        return obj.author.public_name
    def get_author_name(self, obj):
        return obj.author.name