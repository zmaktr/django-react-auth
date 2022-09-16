from django.urls import path
from . import views
from . views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    #TokenObtainPairView, # decode token claims
    TokenRefreshView,
)


urlpatterns = [
    # endpoints
    path('', views.getRoutes),
    # auth tokens
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # query db
    path('notes/', views.getNotes),
    # create user
    path('create-user/', views.createUser, name='create_user')
]