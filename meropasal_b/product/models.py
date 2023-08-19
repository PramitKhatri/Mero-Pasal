from django.db import models
from seller.models import Seller
from category.models import Category

# Create your models here.

class Product(models.Model):
    product_name=models.CharField(max_length=255)
    seller=models.ForeignKey(Seller,on_delete=models.CASCADE)
    category=models.ForeignKey(Category,on_delete=models.SET_DEFAULT,default='category_not_found')
    description=models.TextField()
    price=models.FloatField()
    stock=models.IntegerField(default=100)
    product_image=models.FileField(upload_to='products',null=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product_name

