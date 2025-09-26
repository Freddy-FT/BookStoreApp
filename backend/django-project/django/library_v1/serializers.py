from rest_framework import serializers
from library.models import Book

class BookSerializer(serializers.ModelSerializer):
    public_name = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    is_author = serializers.SerializerMethodField()
    class Meta:
        model = Book
        fields = ["id","title","author","public_name","name","description","release_date", "is_author"]
        read_only_fields = ["author"]
    def get_public_name(self, obj):
        return obj.author.public_name
    def get_name(self, obj):
        return obj.author.name
    def get_is_author(self,obj):
        request = self.context.get("request")
        if request and obj.author_id == request.user.id:
            return True
        return False
    
class AuthorBooksListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["id", "title", "release_date"]