from rest_framework.views import APIView
from .serializers import ProductSerializer
from .models import Product
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser


class ProductView(APIView):

    #i dont need get no more. since it keeps giving me 401 error. we gonna use viewsets
    def get(self,request,format=None):
        products=Product.objects.all()
        serializer=ProductSerializer(products,many=True,context={'request': request})
        return Response(serializer.data)

    def post(self,request,format=None):
        print(request.data)
        permission_classes=[IsAuthenticated]
        serializer=ProductSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductViewSet(viewsets.ModelViewSet):
    queryset=Product.objects.all().order_by('id')
    parser_classes=(MultiPartParser,FormParser)
    serializer_class=ProductSerializer
    permission_classes=[AllowAny]
