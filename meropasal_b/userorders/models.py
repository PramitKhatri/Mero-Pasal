from django.db import models
from django.contrib.auth.models import User
from product.models import Product
from seller.models import Seller

# Create your models here.
class PaymentMethod(models.Model):
    paymentmethod=models.CharField(max_length=200, default='Cash on Delivery')



class Order(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    seller=models.ForeignKey(Seller,on_delete=models.CASCADE)
    quantity=models.IntegerField()
    address=models.CharField(max_length=200)
    paymentmethod=models.ForeignKey(PaymentMethod,on_delete=models.CASCADE)
    paymentstatus=models.BooleanField(default=False)
    deliverystatus=models.BooleanField(default=False)
    date=models.DateTimeField(auto_now_add=True)

