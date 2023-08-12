# Here is where ChatGpt came clutch. Since I am using Two types of user when i made this app,
# I made it so that Seller will have email as a unique field. 
# Now the normal user=authenticate() function can only use username and password . 
# So to work around that issue I have to create a custom suthenticate function that will handle the Seller authentication. 
# And have to manually register it in settings.py 
#  so when i have to authenticate user with email and not username I have to follow this way
# In views.py, I can import authenticate as appname.custom_authenticator import authenticator_class  if I have registered in settings.py 
# both the app name and function name can be anything i want. Check line 57-61 in setting.py (maychange)
# quick note: just not make your instance and your function name which is authenticate same
# example: 
# from seller.authenticator import SellerAuthenticator 
# authenticate_seller=SellerAuthenticator()  not authenticate=SellerAuthenticator()
# use it as: seller=authenticate_seller.authenticate(request,email,password)

from django.contrib.auth.backends import ModelBackend
from .models import Seller

class SellerAuthenticator(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            seller = Seller.objects.get(email=email)
        except Seller.DoesNotExist:
            return None
        else:
            if seller.check_password(password):
                return seller
        return None