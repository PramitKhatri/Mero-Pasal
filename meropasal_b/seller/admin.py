# admin.py
from django.contrib import admin
from .models import Seller

class SellerAdmin(admin.ModelAdmin):
    list_display=('id', 'email', 'first_name', 'last_name', 'company_name','seller_desc','seller_image','seller_verification','status', 'is_active', 'is_staff',) #what you want to display in admin
    list_filter=('email',) #how the list would be filtered in admin page
    ordering=('id','email',) #what the sorting system will be in admin, just check left to id and email headings
    search_fields=('email',) #with which you will search for a seller
    # fields = ('email', 'first_name', 'last_name', 'is_active', 'is_staff','company_name','seller_desc','seller_image','seller_verification','status',)
    fieldsets=(   #better way to group seller information than putting it all out there like in fields when you click on a specific seller
        ('Seller Credentials',{'fields':('email','password',)}),
        ('Seller Info',{'fields':('first_name','last_name', 'company_name','seller_desc',)}),
        ('Seller Validations',{'fields':('seller_image','seller_verification','status',)}),
        ('Permissions',{'fields':('is_active', 'is_staff',)}),
    )
    

admin.site.register(Seller, SellerAdmin)

