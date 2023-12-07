from django.shortcuts import render
from rest_framework import viewsets,permissions,status
from rest_framework.permissions import AllowAny,IsAuthenticated
from userorders.models import PaymentMethod,Order
from userorders.serializers import PaymentMethodSerializer,OrderSerializer,OrderItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset=PaymentMethod.objects.all()
    serializer_class=PaymentMethodSerializer
    permission_classes=[permissions.AllowAny]


class OrderView(APIView):
    permission_classes=[permissions.IsAuthenticated]

    def get(self,request,userid,format=None):
        order=Order.objects.filter(user_id=userid) # In Django, when you define foreign key relationships between models, the convention is to use the name of the related model followed by "_id" as the field name by default. So, if you have a foreign key relationship to the User model, the field name is typically user_id or user__username  .(double underscore for other things)
        serializer=OrderSerializer(order, many=True)
        return Response(serializer.data)

    def post(self,request,userid):
        print(request.data)
        order_data = request.data.get('orders', [])  #since we are sending data from the frontend inside an orders object
        orderitem_data=request.data.get('orderitem',[])

        order_serializer = OrderSerializer(data=order_data)  #many means more than one product order
        if order_serializer.is_valid(raise_exception=True):
            order_serializer.save()

            for orderitem in orderitem_data:
                orderitem['orders']=order_serializer.id
                OrderItemSerializer=OrderItemSerializer(data=orderitem)

                if OrderItemSerializer.is_valid(raise_exception=True):
                    OrderItemSerializer.save()
                    
            return Response({'msg':'Order completed'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)