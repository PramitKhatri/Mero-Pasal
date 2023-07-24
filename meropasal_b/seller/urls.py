from django.urls import path
from .views import *

urlpatterns=[
    path('sellerregister/',sellerregister),
    path('sellerlogin',sellerlogin)
]
