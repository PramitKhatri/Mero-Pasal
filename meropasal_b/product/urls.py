from django.urls import path,include
from product.views import ProductViewSet,ProductView,Productupdatedelete,FilteredProduct,ProductViewForAdmin
from rest_framework.routers import DefaultRouter

productrouter=DefaultRouter()
productrouter.register(r'productview',ProductViewSet)

urlpatterns=[
    # path('product/',ProductView.as_view(),name='addproduct'),
    path('product/<int:sellerid>/',ProductView.as_view()),
    path('filterproduct/<str:category>/',FilteredProduct.as_view()),
    path('api/',include(productrouter.urls)),
    path('productupdatedelete/<int:pk>/',Productupdatedelete.as_view(),name='product-delete-update'),
    path('productviewadmin/',ProductViewForAdmin.as_view(),name='product_view_admin'),
    
]
