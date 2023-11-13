from django.urls import path
from .views import *

urlpatterns = [
    path('signup/',signup),
    path('login/',login),
    path('profile/',UserProfileView.as_view(),name='profile'),
    path('changepassword/',ChangePassword.as_view(),name='change password'),
    
]
