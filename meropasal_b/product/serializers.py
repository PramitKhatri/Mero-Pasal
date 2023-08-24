from rest_framework import serializers
from .models import Product
from seller.models import Seller
from category.models import Category

class ProductSerializer(serializers.ModelSerializer):
    seller=serializers.PrimaryKeyRelatedField(queryset=Seller.objects.all()) #PrimaryKeyRelatedField may be used to represent the target of the relationship using its primary key.
    category=serializers.SlugRelatedField(slug_field='category', queryset=Category.objects.all())   #This setup allows you to pass the category name as a string when creating a new product. The serializer will use the provided string to look up the corresponding Category instance based on the unique category field.
    class Meta:
        model=Product
        fields=['product_name','seller','category','description','price','stock','product_image','created_at']