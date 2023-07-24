from django.shortcuts import render,redirect
from django.views.decorators.csrf import csrf_exempt
from .models import *

from rest_framework.parsers import JSONParser
from django.http import JsonResponse

from django.db import IntegrityError
from rest_framework import status
from django.contrib.auth import authenticate



# Create your views here.

@csrf_exempt
def sellerregister(request):
    if request.method=='POST':
        try:
            data=JSONParser().parse(request)
            print("Received data from front-end:", data)
            seller=Seller.objects.create_user(
                email=data['email'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                password=data['password'],
                company_name=data['company_name'],
                seller_desc=data['seller_desc'],
                seller_image=request.FILES.get('seller_image'),
                seller_verification=request.FILES.get('seller_verification')

            )
            seller.save()    #SellerToken is our custom token model for seller since Token is for User
            sellerToken=SellerToken.objects.create(seller=seller)  #front seller is the modified token model seller. look at models.py for more info
            return JsonResponse({'token':str(sellerToken)},status=status.HTTP_201_CREATED)

        except IntegrityError:
            return JsonResponse({'error':'email already taken'},status=status.HTTP_400_BAD_REQUEST)


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
