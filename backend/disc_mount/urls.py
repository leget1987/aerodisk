from django.urls import path
from .views import get_discs
from rest_framework.authtoken import views


urlpatterns = [
    path('api-token-auth/', views.obtain_auth_token, name='create-token'),
    path('discs/', get_discs, name='discs'),
]
