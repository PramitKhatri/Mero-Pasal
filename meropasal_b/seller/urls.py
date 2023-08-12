from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter

router=DefaultRouter()  #this is done since i am using ModelViewSet in views and not generics
router.register(r'seller',SellerViewSet)  # the r is not required but    Using the r prefix makes the string a raw string and ensures that any backslashes within the string are treated as literal characters. It can help prevent problems when defining complex URL patterns or when working with regular expressions.

urlpatterns=[
    path('sellerregister/',sellerregister),
    path('sellerlogin',sellerlogin),
    path('api/',include(router.urls)),  #The router will generate the following URLs for the SellerViewSet:       /api/seller/: List and create view           /api/seller/{pk}/: Retrieve, update, and delete view for individual sellers
    path('sregister/',SellerRegistrationView.as_view(),name='sregister'),
    path('slogin/',SellerLoginView.as_view(),name='slogin'),
    
]
