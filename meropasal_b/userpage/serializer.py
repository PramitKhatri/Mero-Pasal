from rest_framework import serializers
from django.contrib.auth.models import User

from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','email','first_name','last_name','is_staff']

class ChangePasswordSerializer(serializers.Serializer):
    password=serializers.CharField(write_only=True,required=True)

    def validate_password(self,password):
        if len(password)==0:
            raise serializers.ValidationError('password is not valid')
        return password

class ResetEmailSerializer(serializers.Serializer):
    email=serializers.EmailField(max_length=255)

    class Meta:
        fields=['email']

    def validate(self,attrs):
        email=attrs.get('email')
        if User.objects.filter(email=email).exists():
            user=User.objects.get(email=email)
            userid=urlsafe_base64_encode(force_bytes(user.id))
            print('encoded UserId',userid)

            token=PasswordResetTokenGenerator().make_token(user)
            print('password reset token',token)

            link='http://localhost:3000/api/user/reset/'+userid+'/'+ token
            print('passwprd reset linl',link)

            return attrs

        else:
            raise serializers.ValidationError('you are not registered user')