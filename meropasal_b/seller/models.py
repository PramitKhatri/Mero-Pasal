from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin
from rest_framework.authtoken.models import Token

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
    email=models.EmailField(unique=True)   # i don't have to create a passeord field as it is automatically inherited from abstractuser
    first_name=models.CharField(max_length=100)
    last_name=models.CharField(max_length=100)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    company_name=models.CharField(max_length=100)
    seller_desc=models.TextField()
    seller_image=models.FileField(upload_to='seller/sellerImage',null=True)
    seller_verification=models.FileField(upload_to='seller/sellerVerification',null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    status=models.BooleanField(default=False,null=True)  #verification status


    objects=SellerUserManager()

    USERNAME_FIELD='email'   #this makes it so that email is used as a unique identifier and not username
    EMAIL_FIELD='email'
    REQUIRED_FIELDS=[]

   # Provide unique related names for groups and user_permissions
    groups = models.ManyToManyField('auth.Group', related_name='seller_users')
    user_permissions = models.ManyToManyField('auth.Permission', related_name='seller_users')

    def __str__(self):
        return self.email

class SellerToken(Token):
    seller = models.OneToOneField(Seller, on_delete=models.CASCADE, related_name='auth_token')  #seller not User