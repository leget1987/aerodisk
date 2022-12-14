from django.urls import path
from .views import get_disks, format, mount, umount
from rest_framework.authtoken import views


urlpatterns = [
    path('api-token-auth/', views.obtain_auth_token, name='create-token'),
    path('disks/', get_disks, name='disks'),
    path('format/', format, name='format'),
    path('mount/', mount, name='mount'),
    path('umount/', umount, name='umount'),
]
