import imp
from django.http import JsonResponse
from rest_framework.response import Response 
from rest_framework.decorators import api_view

@api_view(['GET'])
# this view/function is created to present all our endpoints
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    return Response(routes) # safe=False means that it can also return other than python dictionary