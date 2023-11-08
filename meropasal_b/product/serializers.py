from rest_framework import serializers
from .models import Product
from django.contrib.auth.models import User

from category.models import Category
from django.conf import settings

class ProductSerializer(serializers.ModelSerializer):
    category=serializers.SlugRelatedField(slug_field='category', queryset=Category.objects.all())   #This setup allows you to pass the category name as a string when creating a new product. The serializer will use the provided string to look up the corresponding Category instance based on the unique category field.
    product_image_url = serializers.SerializerMethodField()  # Add this field

    def get_product_image_url(self, obj):
        request = self.context['request']
        return request.build_absolute_uri(settings.MEDIA_URL + str(obj.product_image))


    class Meta:
        model=Product
        fields=['id','product_name','seller','category','description','price','stock','product_image','product_image_url','created_at']