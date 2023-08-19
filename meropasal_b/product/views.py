from rest_framework.views import APIView
from .serializers import ProductSerializer
from .models import Product
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


class ProductView(APIView):

    def get(self,request,format=None):
        product=Product.objects.all()
        serializer-ProductSerializer(product)
        return JsonResponse(serializer.data)

    def post(self,request,format=None):
        permission_classes=[IsAuthenticated]
        serializer=ProductSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)