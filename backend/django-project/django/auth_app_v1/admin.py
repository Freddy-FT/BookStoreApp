from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from auth_app_v1 import models

class UserAdmin(BaseUserAdmin):

    ordering = ["id"]
    list_display = ["email", "name", "public_name"]
    fieldsets = (
        ("Main Information", {"fields": ("email", "password")}),
        ("Personal Information", {"fields": ("name","public_name")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                )
            },
        ),
        ("Additional Information", {"fields": ("last_login",)}),
    )
    readonly_fields = ["last_login"]
    add_fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "name",
                    "public_name"
                    "is_active",
                    "is_staff",
                ),
            },
        ),
    )

admin.site.register(models.User, UserAdmin)