from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','email','first_name','last_name','is_staff']

class ChangePasswordSerializer(serializers.Serializer):
    password=serializers.CharField(write_only=True,required=True)

    def validate_password(self,password):
        if len(value)==0:
            raise serializers.ValidationError('password is not valid')
        
        return value

