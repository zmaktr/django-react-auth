import imp
from django.http import JsonResponse
from rest_framework.response import Response 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
# customizing token claims for decode
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# query serliazers/db
from . serializers import NoteSerializer
from base.models import Note


# customizing token claims for decode
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# get endpoints auth tokens
@api_view(['GET'])
# this view/function is created to present all our endpoints
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
        '/api/notes'
    ]
    return Response(routes) # safe=False means that it can also return other than python dictionary

# get endpoints data from db
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)