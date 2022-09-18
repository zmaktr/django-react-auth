import imp
from re import T
from urllib import response
from django.http import JsonResponse
from rest_framework.response import Response 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
# customizing token claims for decode
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import Note

# query serliazers/db
from . serializers import CreateUserSerializer, NoteSerializer

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
        #URLS
        '/api/create-user/',
        '/api/token/',
        '/api/token/refresh/',
        '/api/notes/',
        '/api/delete-notes/<int:id>',
        '/api/create-notes/'
    ]
    return Response(routes) # safe=False means that it can also return other than python dictionary

# get notes data from db 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

# create new user
@api_view(['POST'])
@permission_classes([AllowAny])
def createUser(request):
    serializer = CreateUserSerializer(data = request.data)
    serializer.is_valid(raise_exception=True)
    # saves the user to the database
    serializer.save()
    response = serializer.data
    return Response(response)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createNotes(request):
    serializer = NoteSerializer(data = request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(user=request.user)
    response = serializer.data
    return Response(response)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteNotes(request, id):
    note = Note.objects.get(id=id)
    note.delete()
    return Response ({'deleted note id':id})

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateNotes(request, id):
    note = Note.objects.get(id=id)
    serializer = NoteSerializer(note, data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(user=request.user)
    response = serializer.data
    return Response(response)
