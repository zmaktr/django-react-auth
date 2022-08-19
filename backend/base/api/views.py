import imp
from django.http import JsonResponse
from rest_framework.response import Response 
from rest_framework.decorators import api_view
# customizing token claims for decode
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

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

# get endpoints
@api_view(['GET'])
# this view/function is created to present all our endpoints
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    return Response(routes) # safe=False means that it can also return other than python dictionary