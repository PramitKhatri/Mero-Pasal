from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin

# Create your models here.

class SellerUserManager(BaseUserManager):
    def create_user(self,email,password=None,**extra_fields):  #this is to create a seller user with admin accesse but not access to django administration.  Seller.object.create_user
        email=self.normalize_email(email)
        user=self.model(email=email,**extra_fields)
        user.set_password(password)
        extra_fields.setdefault('is_staff',True)  #is_staff will let the user made here to have some admin accesses
        user.save()
        return user

    def create_superuser(self,email,password=None,**extra_fields):  # this is a bit unnecessary as seller wont be allowed to acess the administration
        extra_fields.setdefault('is_superuser',True)
        return self.create_user(email,password,**extra_fields)


# Since sellers would be different types of users they are custom users inherited from abstractbaseuser
class Seller(AbstractBaseUser,PermissionsMixin):
    email=models.EmailField(unique=True)
    first_name=models.CharField(max_length=100)
    last_name=models.CharField(max_length=100)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    seller_desc=models.TextField()
    seller_image=models.FileField(upload_to='static/uploads/sellers',null=True)
    seller_verification=models.FileField(upload_to='static/uploads/sellerVerification',null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    status=models.BooleanField(default=False,null=True)


    objects=SellerUserManager()

    USERNAME_FIELD='email'
    EMAIL_FIELD='email'
    REQUIRED_FIELDS=[]

    def __str__(self):
        return self.email