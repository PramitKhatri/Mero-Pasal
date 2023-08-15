from rest_framework.views import APIView
from .serializer import CategorySerializer
from django.http import JsonResponse
from rest_framework import status,permissions
from rest_framework.permissions import IsAdminUser,IsAuthenticated

# Create your views here.

class AddCategoryView(APIView):
    permission_classes = [IsAdminUser,IsAuthenticated]
    
    def post(self,request):
        serializer=CategorySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse({'msg':'Category added successfully'},status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
