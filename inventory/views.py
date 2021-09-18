from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from .models import Item

from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name='index.html'))


# Create your views here.
@api_view(['GET'])
def getItems(request):
    itemObj = Item.objects.all()
    serializer = ItemSerializer(itemObj, many=True)

    return Response(serializer.data)

