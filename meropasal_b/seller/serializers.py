from rest_framework import serializers
from .models import *


class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Seller
        fields=['id','email','first_name','last_name','company_name','seller_desc','seller_image','seller_verification','status']