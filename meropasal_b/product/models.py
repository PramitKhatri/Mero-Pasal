from django.db import models
from category.models import Category
from django.contrib.auth.models import User


# Create your models here.

class Product(models.Model):
    product_name=models.CharField(max_length=255)
    seller=models.ForeignKey(User,on_delete=models.CASCADE)
    category=models.ForeignKey(Category,on_delete=models.SET_DEFAULT,default='category_not_found')
    description=models.TextField()
    # price=models.DecimalField(max_digits=6 decimal_places=2)
    price=models.FloatField()
    stock=models.IntegerField(default=100)
    product_image=models.FileField(upload_to='products',null=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product_name
    
    
class Ratings(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    rating=models.FloatField()
    review=models.CharField(max_length=255)
    review_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'user:{self.user.username},product:{self.product.product_name},rating:{self.rating}'

