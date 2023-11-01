from django.contrib import admin
from . models import PaymentMethod,Order
# Register your models here.
admin.site.register(PaymentMethod)
admin.site.register(Order)