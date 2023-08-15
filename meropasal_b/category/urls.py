from django.urls import path
from .views import AddCategoryView


urlpatterns=[
    path('addCategory/',AddCategoryView.as_view(),name='addCategory' ) 
]
