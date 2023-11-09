from rest_framework.views import APIView
from .serializers import ProductSerializer
from product.models import Product
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAuthenticatedOrReadOnly
from django.db import IntegrityError
from rest_framework.exceptions import ParseError
from rest_framework.response import Response
from rest_framework import viewsets,generics,status,permissions
from rest_framework.parsers import MultiPartParser, FormParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import permission_classes

class ProductViewSet(viewsets.ModelViewSet):
    queryset=Product.objects.all().order_by('id')
    parser_classes=(MultiPartParser,FormParser)
    serializer_class=ProductSerializer
    permission_classes=[AllowAny]


@permission_classes([AllowAny])
@csrf_exempt
def SellerProductView(request,sellerid):
    if request.method=='POST':
        try:
            print("Received data from front-end:", request.POST)
            print("Received files from front-end:", request.FILES)

            product=Product.objects.create(
                product_name=request.POST.get('product_name'),
                seller=request.POST.get('seller'),
                category=request.POST.get('category'),
                description=request.POST.get('description'),
                price=request.POST.get('price'),
                stock=request.POST.get('stock'),
                product_image=request.FILES.get('product_image'),
            )
            product.save()
            return JsonResponse({'msg':'Product Created.'},status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            print("Integrity Error:", str(e))
            return JsonResponse({'error':'email already taken'},status=status.HTTP_400_BAD_REQUEST)
        except ParseError as e:
            return JsonResponse({'error': 'Invalid data format :{}'.format(e)},status=status.HTTP_400_BAD_REQUEST)   #the format(e) is used within the except block to include the specific error message into the response. It's a way to get the string representation of the exception (e) and include it in the JSON response.
        except Exception as e:
            return JsonResponse({'error':'Something else went wrong:{}'.format(e)},status=status.HTTP_403_FORBIDDEN)
        
    if request.method=='GET':
        try:
            productDetails=Product.objects.filter(seller=sellerid)
            return Response(productDetails)
        except Exception as e:
            return JsonResponse({'error':'Something else went wrong:{}'.format(e)},status=status.HTTP_403_FORBIDDEN)
            




class ProductView(APIView):

    def get(self,request,sellerid,format=None):
        products=Product.objects.filter(seller=sellerid)
        serializer=ProductSerializer(products,many=True,context={'request': request})
        return Response(serializer.data)

    def post(self,request,sellerid,format=None):
        print(request.data)
        permission_classes=[IsAuthenticated]
        serializer=ProductSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Productupdatedelete(generics.RetrieveUpdateDestroyAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer
    permission_classes=[permissions.IsAuthenticated]

    def retrieve(self,request,*args,**kwargs):  #how this code should be written
        product = self.get_object()            #gets product automatically by using the id given in url 
        serializer = self.get_serializer(product)
        return Response(serializer.data)

    def delete(self,request,*args,**kwargs):  #how sir taught us to do
        product=Product.objects.filter(pk=kwargs['pk'])  #gets product by explicitly setting the id
        if product.exists():
            self.destroy(request,*args,**kwargs)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
