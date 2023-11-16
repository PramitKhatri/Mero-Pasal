# Mero-Pasal
If you have copied this code then please ensure that all dependencies both for React and Django are installed.

If you are getting react scripts missing error when doing npm start, install it first in the directory ":C//Mero Pasal/meropasal_f/"

--> npm i react-scripts

for server-side :
go to :C//Mero Pasal/

--> myvenv\scripts\activate

--> cd meropasal_b
Now you should be inside meropasal_b directory.
--> pip install -r requirements.txt
--> python manage.py runserver

If at any time you decide to update or add any new python pakages then to update the requirements.txt file
In C://Mero Pasal/meropasal_b/

--> pip freeze > requirements.txt  (only do this while in virtual environment)





Various Users for the application

admin@admin.com
admin

seller@seller.com
seller@123

seller2@seller.com
seller@123

user@user.com
user@123

user2@user.com
user@123
===========================

When you install dotenv make sure to add changes to manage.py file
these are:

import dotenv
 def main:
    dotenv.read_dotenv()

now in main project directory, create a file named  .env and add your EMAIL_USER,EMAIL_PASSWORD, EMAIL_FROM


If you add your authentic gmail and password, for it to work, go to gmail.com and in manage your account option you need to turn on less secure app access in Security.  This will allow this django function to use your gmail to send email.
============================



In case if you ever want to delete data form the databasw without deleting the table itself, do this:
-> python manage.py shell
-> from django.contrib.auth.models import User  or it can be like from product.models import Product
-> User.objects.all().delete()  //replace the User with your model name.





===============These only apply to the previous version of meropasal, due to various authentication and authorization problems, the seller model had to be removed entirely.=========================

~~ Mero-Pasal consists of two user model. One is User model that handles normal users and Other is a custom User model named Seller that handles the function of a Seller/vendor.

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
 use it as: seller=authenticate_seller.authenticate(request,email,password)~~