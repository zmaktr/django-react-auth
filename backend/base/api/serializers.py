from dataclasses import field, fields
import imp
from rest_framework.serializers import ModelSerializer
from base.models import Note
from django.contrib.auth.models import User

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__' # 'user' & 'body'

class CreateUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  # 'username' & 'password'
    
    # def create(self, validated_data):
    #     return User.objects.create_user(**validated_data)