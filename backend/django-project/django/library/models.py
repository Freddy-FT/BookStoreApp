from core import settings
from django.utils import timezone
from django.db import models
import uuid
from datetime import date

class Book(models.Model):
    id = models.UUIDField(primary_key=True,
        default=uuid.uuid4,
        editable=False)
    title = models.CharField(max_length=255)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    release_date = models.DateField(default=date.today)
    description = models.TextField(max_length=500, blank=True)
    def __str__(self):
        return self.title