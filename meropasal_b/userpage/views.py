from django.shortcuts import render,redirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from django.db import IntegrityError
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework import status

# Create your views here.
# In django the username field of User model needs to be unique but this can be changed by addning a custom user and modifying the User location in settings.py.This can be done but is unnecssary and complicated so here you can't use same email and usernames but this can be changed by creating a custom user which i am not in the mood to create 
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            email = data['email']

            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email has already been taken. Try another'}, status=400)

            user = User.objects.create_user(
                username=data['username'],
                email=email,
                password=data['password'],
                first_name=data['first_name'],
                last_name=data['last_name']
            )
            user.save()
            token = Token.objects.create(user=user)
            return JsonResponse({'token': str(token)}, status=201)
        except IntegrityError:
            return JsonResponse({'error': 'Username has already been taken'}, status=400)


@csrf_exempt
def login(request):
    if request.method== 'POST':
        data=JSONParser().parse(request)
        user=authenticate(request,email=data['email'],password=data['password'])

        if user is None:
            return JsonResponse({'error':'email or password doesnot match'},status=400)
        else:
            try:
                token=Token.objects.get(user=user)
            except:
                token=Token.objects.create(user=user)
            return JsonResponse({'token':str(token)},status=200)