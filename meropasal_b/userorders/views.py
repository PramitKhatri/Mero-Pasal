from django.shortcuts import render
from rest_framework import viewsets,permissions,status
from rest_framework.permissions import AllowAny,IsAuthenticated
from userorders.models import PaymentMethod,Order
from userorders.serializers import PaymentMethodSerializer,OrderDetailSerializer,OrderItemSerializer
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
        serializer=OrderDetailSerializer(order, many=True)
        return Response(serializer.data)

    def post(self,request,userid):
        print(request.data)
        order_detail = request.data.get('order_detail')  #since we are sending data from the frontend inside an order_detail object
        order_items=request.data.get('order_items')  #same thing but can have multiple items in cart basically

        orderdetail_serializer = OrderDetailSerializer(data=order_detail)  

        if orderdetail_serializer.is_valid(raise_exception=True):
            orderdetail_instance=orderdetail_serializer.save()  #we can do just orderdetail_serializer.save() but to access the order id and put it in orderitems we create an instance right when it is saved to db so that we can access what is in the __str__ of model

            print("orderdetail_instance is :"+str(orderdetail_instance))  #for debugging

            for singleitem in order_items:  #loop over every item to create an instance of the item all having the same order detail
                singleitem['order']=orderdetail_instance.id         # Set the order id property in orderitem. note that singleitem is a temporary variable name to hold the orderitem

                print(singleitem)

                orderitem_serializer=OrderItemSerializer(data=singleitem)

                if orderitem_serializer.is_valid(raise_exception=True):
                    orderitem_serializer.save()

            response_orderdetail=OrderDetailSerializer(orderdetail_instance)  
            print("after this response_orderdetail will not only contain the data but also the whole serialized model information so only send the data")
            print(response_orderdetail) 
            return Response(response_orderdetail.data,status=status.HTTP_201_CREATED)  # I could probably just to return Response({orderdetail_instance})  but this makes it more clear
        return Response(orderdetail_serializer.errors,status=status.HTTP_400_BAD_REQUEST)