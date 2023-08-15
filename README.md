# Mero-Pasal
If you have copied this code then please ensure that all dependencies both for React and Django are installed.
I haven't used a virtual enviroment so both server don't require it.
If you are getting react scripts missing error when doing npm start, install it first in the directory ":C//Mero Pasal/meropasal_f/"


Mero-Pasal consists of two user model. One is User model that handles normal users and Other is a custom User model named Seller that handles the function of a Seller/vendor.

User authentication is done with Token for users and JWT refresh token for sellers. I did this so that I can learn to use both. JWT tokens seem to be progressively better but also a bit difficult to implement.

Since I am using Two types of user when I made this app,
I made it so that Seller will have email as a unique field. 
Now the normal user=authenticate() function can only use username and password . 
So to work around that issue I have to create a custom suthenticate function that will handle the Seller authentication. 
And have to manually register it in settings.py 
so when i have to authenticate user with email and not username I have to follow this way
In views.py, I can import authenticate as from from appname.custom_authenticator import authenticator_class if I have registered in settings.py 
both the app name and function name can be anything i want. Check line 57-61 in setting.py (maychange)
quick note: just not make your instance and your function name which is authenticate same
example: 
 from seller.authenticator import SellerAuthenticator 
 authenticate_seller=SellerAuthenticator()  not authenticate=SellerAuthenticator()
 use it as: seller=authenticate_seller.authenticate(request,email,password)






