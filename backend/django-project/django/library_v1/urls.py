from django.urls import path, include
from .views import (
    BooksList, BookDetails, BookCreate, BookUpdate, BookDelete, AuthorBooksList
)

urlpatterns = [
    path('books/', BooksList.as_view(),),       

    path('book/create/', BookCreate.as_view(),),    

    path('book/<uuid:pk>/', BookDetails.as_view(),),    

    path('book/<uuid:pk>/update/', BookUpdate.as_view(),),   
    
    path('book/<uuid:pk>/delete/', BookDelete.as_view(),),   

    path('author/<slug:name>/books',AuthorBooksList.as_view(),),
]