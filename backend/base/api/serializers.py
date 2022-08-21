from dataclasses import field
import imp
from rest_framework.serializers import ModelSerializer
from base.models import Note

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'