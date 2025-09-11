from django.urls import path, include

urlpatterns = [
    path('library_v1/', include('library_v1.urls'))
]