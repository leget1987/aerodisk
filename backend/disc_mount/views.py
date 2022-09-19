from django.http import HttpResponse
import subprocess
import json
from django.core import serializers
from django.http import JsonResponse
from rest_framework.renderers import JSONRenderer



def get_discs(request):
    disc_data = subprocess.run(['lsblk', '-o', 'NAME,FSTYPE,SIZE,TYPE,MOUNTPOINT', '-l', '-J'], stdout=subprocess.PIPE, encoding='utf-8').stdout
    # sudo mkfs.ext4 /dev/sdb
    # sudo mount /dev/sdb /mnt/

    
    return HttpResponse(disc_data, content_type="application/json")
