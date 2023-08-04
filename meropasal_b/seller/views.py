from django.shortcuts import render,redirect
from django.views.decorators.csrf import csrf_exempt
from .models import *
from .serializers import *

from rest_framework.parsers import JSONParser
from django.http import JsonResponse

from django.db import IntegrityError
from rest_framework import status,viewsets,permissions
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import authenticate

from rest_framework.exceptions import ParseError


# Create your views here.

@csrf_exempt
def sellerregister(request):
    if request.method=='POST':
        try:
            #here the data sent from the frontend is multipart/form-data so we dont or cant use jsonparser. jsonparser is specifically to handle json data. django automatically handles the form-data input and the data is stored in instance of request.POST
            # data=JSONParser().parse(request)
            print("Received data from front-end:", request.POST)
            print("Received files from front-end:", request.FILES)

            seller=Seller.objects.create_user(  #Django automatically handles the multipart/form-data input and stores the form data in the request.POST and request.FILES objects.
                email=request.POST['email'],
                first_name=request.POST['first_name'],
                last_name=request.POST['last_name'],
                password=request.POST['password'],
                company_name=request.POST['company_name'],
                seller_desc=request.POST['seller_desc'],
                seller_image=request.FILES.get('seller_image'),
                seller_verification=request.FILES.get('seller_verification')

            )
            seller.save()    #SellerToken is our custom token model for seller since Token is for User
            sellerToken=SellerToken.objects.create(seller=seller)  #front seller is the modified token model seller. look at models.py for more info
            return JsonResponse({'token':str(sellerToken)},status=status.HTTP_201_CREATED)

        except IntegrityError as e:
            print("Integrity Error:", str(e))
            return JsonResponse({'error':'email already taken'},status=status.HTTP_400_BAD_REQUEST)
        except ParseError as e:
            return JsonResponse({'error': 'Invalid data format :{}'.format(e)},status=status.HTTP_400_BAD_REQUEST)   #the format(e) is used within the except block to include the specific error message into the response. It's a way to get the string representation of the exception (e) and include it in the JSON response.
        except Exception as e:
            return(JsonResponse({'error':'Something else went wrong:{}'.format(e)},status=status.HTTP_403_FORBIDDEN))


@csrf_exempt
def sellerlogin(request):
    if request.method=='POST':
        data=JSONParser().parse(request)
        seller=authenticate(request,email=data['email'],password=data['password'])


        if seller is None:
            return JsonResponse({'error':'email or password doesnot match'},status=status.HTTP_404_NOT_FOUND)
        else:
            try:
                token=Token.objects.get(user=seller)
            except:
                token=Token.objects.create(user=seller)
            return JsonResponse({'token':str(token)},status=status.HTTP_200_OK)



class SellerViewSet(viewsets.ModelViewSet):
    queryset=Seller.objects.all()
    serializer_class=SellerSerializer
    parser_classes=(MultiPartParser,FormParser)
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]