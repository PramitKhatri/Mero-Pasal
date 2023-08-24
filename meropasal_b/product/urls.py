from django.urls import path
from .views import ProductView


urlpatterns=[
    path('addproduct/',ProductView.as_view(),name='addproduct')
    
]
