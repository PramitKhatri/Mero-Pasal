from django.urls import path,include
from product.views import ProductViewSet,ProductView
from rest_framework.routers import DefaultRouter

productrouter=DefaultRouter()
productrouter.register(r'productview',ProductViewSet)

urlpatterns=[
    # path('product/',ProductView.as_view(),name='addproduct'),
    path('product/',ProductView.as_view()),
    path('api/',include(productrouter.urls))
    
]
