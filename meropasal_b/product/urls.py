from django.urls import path,include
from .views import ProductView,ProductViewSet
from rest_framework.routers import DefaultRouter

productrouter=DefaultRouter()
productrouter.register(r'productview',ProductViewSet)

urlpatterns=[
    path('product/',ProductView.as_view(),name='addproduct'),
    path('api/',include(productrouter.urls))
    
]
