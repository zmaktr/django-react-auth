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
    path('create-notes/', views.createNotes, name='create_notes'),
    path('delete-notes/<int:id>/', views.deleteNotes, name='delete_notes'),
    path('update-notes/<int:id>/', views.updateNotes, name='update_notes'),
    # create user
    path('create-user/', views.createUser, name='create_user')
]