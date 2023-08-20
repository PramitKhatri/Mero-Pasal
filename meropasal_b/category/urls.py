from django.urls import path
from .views import AddCategoryView


urlpatterns=[
    path('Category/',AddCategoryView.as_view(),name='addCategory' ) 
]
