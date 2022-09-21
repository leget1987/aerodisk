from django.http import HttpResponse
import subprocess
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view


def get_disks(request):
    disc_data = subprocess.run(['lsblk', '-o', 'NAME,FSTYPE,SIZE,TYPE,MOUNTPOINT',
                               '-l', '-J'], stdout=subprocess.PIPE, encoding='utf-8').stdout
    return HttpResponse(disc_data, content_type="application/json")


@api_view(['POST', ])
@csrf_exempt
def format(request):
    try:
        disc_data = subprocess.check_output(
            f'echo {request.data["params"]["password"]} | sudo -S mkfs.ext4 /dev/{request.data["params"]["name"]}', shell=True, encoding='utf-8', stderr=subprocess.STDOUT)
    except subprocess.CalledProcessError as e:
        disc_data = e.output
    return HttpResponse(disc_data, content_type="application/json")


@api_view(['POST', ])
@csrf_exempt
def mount(request):
    try:
        disc_data = subprocess.check_output(
            f'echo {request.data["params"]["password"]} | sudo -S mount /dev/{request.data["params"]["name"]} /mnt/', shell=True, encoding='utf-8', stderr=subprocess.STDOUT)
    except subprocess.CalledProcessError as e:
        disc_data = e.output
    return HttpResponse(disc_data, content_type="application/json")


@api_view(['POST', ])
@csrf_exempt
def umount(request):
    try:
        disc_data = subprocess.check_output(
            f'echo {request.data["params"]["password"]} | sudo -S umount /dev/{request.data["params"]["name"]}', shell=True, encoding='utf-8', stderr=subprocess.STDOUT)
    except subprocess.CalledProcessError as e:
        disc_data = e.output
    return HttpResponse(disc_data, content_type="application/json")
