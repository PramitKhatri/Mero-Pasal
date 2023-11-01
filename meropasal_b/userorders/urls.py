from django.urls import path,include
from userorders.views import PaymentMethodViewSet,OrderView
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register(r'viewpaymentmethod',PaymentMethodViewSet)


urlpatterns=[
    path('api/',include(router.urls)),
    path('order/<int:userid>/',OrderView.as_view(),name='vieworders'),
]
