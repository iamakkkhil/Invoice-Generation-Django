from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from .models import *

# Create your views here.
@api_view(['GET'])
def CustomerPurchases(request):
    itemObj = Customer.objects.all()
    serializer = CustomerSerializer(itemObj, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def AddCustomerPurchase(request):
    data = request.data
    serializer = CustomerSerializer(data = request.data)

    if not serializer.is_valid():
        print("bhai error aaya")
        print(serializer.errors)
        return Response(data)
    
    serializer.save()
    return Response(data)


@api_view(['GET'])
def ViewBill(request, id):
    itemObj = Customer.objects.get(id=id)
    serializer = CustomerSerializer(itemObj)

    return Response(serializer.data)


@api_view(['PUT'])
def EditBill(request, id):
    itemObj = Customer.objects.get(id=id)
    serializer = CustomerSerializer( itemObj, data = request.data)

    if not serializer.is_valid():
        print(serializer.errors)
        return Response(request.data)
    
    serializer.save()
    return Response(serializer.data)

