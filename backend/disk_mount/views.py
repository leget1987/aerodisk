from django.http import HttpResponse
import subprocess
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view



def get_disks(request):
    disc_data = subprocess.run(['lsblk', '-o', 'NAME,FSTYPE,SIZE,TYPE,MOUNTPOINT', '-l', '-J'], stdout=subprocess.PIPE, encoding='utf-8').stdout
    # sudo mkfs.ext4 /dev/sdb
    # sudo mount /dev/sdb /mnt/

    
    return HttpResponse(disc_data, content_type="application/json")


@api_view(['POST',])
@csrf_exempt 
def format(request):
    # disc_data = subprocess.run(['sudo', 'mkfs.ext4', f'/dev/{request.data["name"]}'], stdout=subprocess.PIPE, encoding='utf-8').stdout
    # disc_data = subprocess.Popen(f'sudo mkfs.ext4 /{request.data["name"]}', stdout=subprocess.PIPE, encoding='utf-8').stdout
    # disc_data = subprocess.Popen(f'sudo mkfs.ext4 /dev/{request.data["name"]}', stdout=subprocess.PIPE, encoding='utf-8').stdout
    # p = subprocess.Popen(['sudo', f'mkfs.ext4 /dev/{request.data["name"]}'], stdin=subprocess.PIPE)
    # p.communicate('12345678')
    # disc_data = p
    print(request.data, 'data')
    disc_data = subprocess.call(f'echo {request.data["params"]["password"]} | sudo -S mkfs.ext4 /dev/{request.data["params"]["name"]}', shell=True)
    print(disc_data)
    return HttpResponse(disc_data, content_type="application/json")


@api_view(['POST',])
@csrf_exempt 
def mount(request):
    disc_data = subprocess.call(f'echo {request.data["params"]["password"]} | sudo -S mount /dev/{request.data["params"]["name"]} /mnt/', shell=True)
    return HttpResponse(disc_data, content_type="application/json")


@api_view(['POST',])
@csrf_exempt 
def umount(request):
    disc_data = subprocess.call(f'echo {request.data["params"]["password"]} | sudo -S umount /dev/{request.data["params"]["name"]}', shell=True)
    return HttpResponse(disc_data, content_type="application/json")
