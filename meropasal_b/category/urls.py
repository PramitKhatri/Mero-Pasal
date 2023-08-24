from django.urls import path,include
from .views import AddCategoryView,CategoryViewSet
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register(r'viewcategory',CategoryViewSet)


urlpatterns=[
    path('Category/',AddCategoryView.as_view(),name='addCategory' ), 
    path('api/',include(router.urls)),
]
