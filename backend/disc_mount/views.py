from django.http import HttpResponse
import subprocess
import json
from django.core import serializers
from django.http import JsonResponse
from rest_framework.renderers import JSONRenderer



def get_discs(request):
    disc_data = subprocess.run(['lsblk', '-o', 'NAME,FSTYPE,SIZE,TYPE,MOUNTPOINT', '-l', '-J'], stdout=subprocess.PIPE, encoding='utf-8').stdout


    # disc_data = json.loads(disc_data)
    # print(disc_data, 'disc_data')
    # print(type(disc_data))
    # data = serializers.serialize('json', disc_data)
    # struct = json.loads(data)
    # data = json.dumps(struct[0])
    return HttpResponse(disc_data, content_type="application/json")
