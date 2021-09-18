from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from .models import Item

# Create your views here.
@api_view(['GET'])
def getItems(request):
    itemObj = Item.objects.all()
    serializer = ItemSerializer(itemObj, many=True)

    return Response(serializer.data)



