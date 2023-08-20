from rest_framework.views import APIView
from .serializer import CategorySerializer
from django.http import JsonResponse
from rest_framework import status,permissions
from rest_framework.permissions import IsAdminUser,IsAuthenticated,AllowAny
from rest_framework.response import Response
from .models import Category


# Create your views here.

class AddCategoryView(APIView):
    def get(self,request,format=None):
        permission_classes=[AllowAny]
        category=Category.objects.all()
        return Response(category)
    
    def post(self,request):
        permission_classes = [IsAdminUser,IsAuthenticated]
        serializer=CategorySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse({'msg':'Category added successfully'},status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
