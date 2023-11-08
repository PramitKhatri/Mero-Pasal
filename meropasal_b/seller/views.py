from django.views.decorators.csrf import csrf_exempt
from .models import *
from .serializers import *

from rest_framework.parsers import JSONParser
from django.http import JsonResponse

from django.db import IntegrityError
from rest_framework import status,viewsets,permissions
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .utils import get_tokens_for_user
from rest_framework.parsers import MultiPartParser, FormParser
from seller.authenticator import SellerAuthenticator  #Custom authenticator for Seller as it is using  email as unique field
authenticate_seller=SellerAuthenticator()  #creating a instance for the class to use authenticate function inside it. can be named anything just not the same name as the function name.

from rest_framework.exceptions import ParseError

from product.models import Product
from product.serializers import ProductSerializer




# Create your views here.
#cerf_exempt is not the recommended way to handle user registration and login as they are vulnerable to cross site forgery attacks ???
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
            token=get_tokens_for_user(seller)  #front seller is the modified token model seller. look at models.py for more info
            seller_data={
                    'id':seller.id,
                    'email':seller.email,
                    'first_name':seller.first_name,
                    'last_name':seller.last_name,
                    'company_name':seller.company_name,
                    'seller_desc':seller.seller_desc,
                    'status':seller.status,
                    'role':'seller'
                }
            response_data={
                    "token":token,
                    "user":seller_data
                }
            return JsonResponse(response_data,status=status.HTTP_201_CREATED)

        except IntegrityError as e:
            print("Integrity Error:", str(e))
            return Response({'error':'email already taken'},status=status.HTTP_400_BAD_REQUEST)
        except ParseError as e:
            return Response({'error': 'Invalid data format :{}'.format(e)},status=status.HTTP_400_BAD_REQUEST)   #the format(e) is used within the except block to include the specific error message into the response. It's a way to get the string representation of the exception (e) and include it in the JSON response.
        except Exception as e:
            return(Response({'error':'Something else went wrong:{}'.format(e)},status=status.HTTP_403_FORBIDDEN))


@csrf_exempt
def sellerlogin(request):
    if request.method=='POST':
        data=JSONParser().parse(request)
        seller=authenticate_seller.authenticate(request,email=data['email'],password=data['password'])


        if seller is None:
            return JsonResponse({'error':'email or password doesnot match'},status=status.HTTP_404_NOT_FOUND)
        else:
            token=get_tokens_for_user(seller)
            seller_data={
                    'id':seller.id,
                    'email':seller.email,
                    'first_name':seller.first_name,
                    'last_name':seller.last_name,
                    'company_name':seller.company_name,
                    'seller_desc':seller.seller_desc,
                    'status':seller.status,
                    'role':'seller'
                }
            response_data={
                    "token":token,
                    "user":seller_data
                }
            return JsonResponse(response_data,status=status.HTTP_200_OK)


#APIView is a class-based view provided by DRF that acts as a base view for building API endpoints.
#  It provides a structured way to define HTTP methods like GET, POST, PUT, DELETE, etc., and
#  handles the processing of requests and responses. 
# You define the behavior of these methods by implementing their corresponding functions (get, post, put, delete, etc.) within your view class.
class SellerRegistrationView(APIView):  #
    def post(self,request,format=None):
        permission_classes = [AllowAny]

        serializer=SellerRegistrationSerializer(data=request.data) #data comes in request.data, serializer will have two things that we can use serializer.data and serializer.errors

        if serializer.is_valid(raise_exception=True): #raise_exception=True: This ensures that if the serializer encounters any validation errors while processing the input data (such as missing required fields or invalid formats), a validation exception will be raised, and the view will return a 400 Bad Request response with the validation errors.      helps in a way that it will return a proper response than saying an error occurred
            seller=serializer.save()
            token=get_tokens_for_user(seller)
            seller_data={
                    'id':seller.id,
                    'email':seller.email,
                    'first_name':seller.first_name,
                    'last_name':seller.last_name,
                    'company_name':seller.company_name,
                    'seller_desc':seller.seller_desc,
                    'status':seller.status,
                    'role':'seller'
                }
                # since image and verifications are files, we put there urls instead
            # if seller.seller_image:
            #     seller_data['seller_image'] =seller.seller_image.url
            
            # if seller.seller_verification:
            #     seller_data['seller_verification'] =seller.seller_verification.url
            
            response_data={
                    "token":token,
                    "user":seller_data
                }
            return Response(response_data,status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class SellerLoginView(APIView):
    def post(self,request,format=None):
        permission_classes = [AllowAny]
        
        serializer=SellerLoginSerializer(data=request.data)
        print(request.data)

        if serializer.is_valid(raise_exception=True):
            email=serializer.data.get('email')
            password=serializer.data.get('password')
            seller=authenticate_seller.authenticate(request,email=email,password=password)

            if seller is not None:
                token=get_tokens_for_user(seller)
                seller_data={
                    'id':seller.id,
                    'email':seller.email,
                    'first_name':seller.first_name,
                    'last_name':seller.last_name,
                    'company_name':seller.company_name,
                    'seller_desc':seller.seller_desc,
                    'status':seller.status,
                    'role':'seller'
                }
            # if seller.seller_image:
            #     seller_data['seller_image'] =seller.seller_image.url
            
            # if seller.seller_verification:
            #     seller_data['seller_verification'] =seller.seller_verification.url

                response_data={
                    "token":str(token),
                    "user":seller_data
                }
                return Response(response_data,status=status.HTTP_200_OK)
            else:
                return JsonResponse({'errors':{'non_field_errors':['Email or password is not valid']}}, status=status.HTTP_404_NOT_FOUND) #when serializer sends an error, it can send non_field_errors as one of the error response but in frontend we catch that error as errors to get all the errors. so to also obtain the non_field_error, we send it inside errors as an object that we will probably jsonify

        return JsonResponse(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class SellerViewSet(viewsets.ModelViewSet):  #this 4 line of code can handle all request of get, post, put , patch and delete. quite amazing
    queryset=Seller.objects.all()
    serializer_class=SellerSerializer
    parser_classes=(MultiPartParser,FormParser) #parser_classes attribute is set to (MultiPartParser, FormParser). This means that this ViewSet is configured to handle both multipart/form-data and application/x-www-form-urlencoded content types.
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]


class SellerProductView(APIView):
    permission_classes=[permissions.IsAuthenticated]
    def get(self,request,sellerid,format=None):
        product=Product.objects.filter(seller_id=sellerid)
        serializer=ProductSerializer(product,many=True)
        print(request)
        return Response(serializer.data)