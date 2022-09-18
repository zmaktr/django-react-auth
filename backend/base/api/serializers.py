from dataclasses import field, fields
import imp
from rest_framework.serializers import ModelSerializer
from base.models import Note
from django.contrib.auth.models import User

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__' # 'user' & 'body'
        
    def create(self, validated_data):
        return Note.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.body = validated_data.get('body', instance.body)
        instance.save()
        return instance

class CreateUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password"]  # 'username' & 'password'
    
    def create(self, validated_data):
        # used for deserialization
        # return an object with validated data including hashed password
        return User.objects.create_user(**validated_data)