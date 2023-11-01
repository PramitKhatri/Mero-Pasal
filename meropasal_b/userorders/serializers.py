from rest_framework import serializers
from userorders.models import PaymentMethod,Order

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model=PaymentMethod
        fields=['id','paymentmethod']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields='__all__'