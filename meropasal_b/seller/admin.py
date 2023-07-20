# admin.py
from django.contrib import admin
from .models import Seller

class SellerAdmin(admin.ModelAdmin):
    fields = ('username', 'email', 'first_name', 'last_name', 'is_active', 'is_staff')

admin.site.register(Seller, SellerAdmin)
