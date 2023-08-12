from rest_framework import serializers
from .models import *

class SellerRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Seller
        fields=['email','password','first_name','last_name','company_name','seller_desc','seller_image','seller_verification']
        extra_kwargs={
            'password':{'write_only':True}
        }
    #def create should be done since this is a custom User model
    def create(self,validate_data):
        return Seller.objects.create_user(**validate_data)


class SellerLoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255)
    class Meta:
        model= Seller
        fields=['email','password']



class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Seller
        fields=['id','email','first_name','last_name','company_name','seller_desc','seller_image','seller_verification','status']