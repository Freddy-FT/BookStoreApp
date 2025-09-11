from django.contrib import admin

# Register your models here.

from .models import Book


class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author')  # Add 'id' here
    readonly_fields = ('id',)



admin.site.register(Book,BookAdmin)