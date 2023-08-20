from rest_framework import serializers
from .models import Product
from seller.models import Seller
from category.models import Category

class ProductSerializer(serializers.ModelSerializer):
    seller=serializers.PrimaryKeyRelatedField(queryset=Seller.objects.all()) #PrimaryKeyRelatedField may be used to represent the target of the relationship using its primary key.
    category=serializers.StringRelatedField(read_only=True) #StringRelatedField may be used to represent the target of the relationship using its __str__ method. It checks the model for with same attribute and uses it, no need to add queryset
    class Meta:
        model=Product
        fields=['product_name','seller','category','product_desc','product_price','stock','product_image','created_at']