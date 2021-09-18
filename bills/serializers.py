from rest_framework import serializers
from inventory.serializers import ItemSerializer
from .models import *


class ItemPurchasedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemPurchased
        fields = "__all__"


class CustomerSerializer(serializers.ModelSerializer):
    purchased_items_obj = ItemPurchasedSerializer(many=True)

    class Meta:
        model = Customer
        fields = "__all__"

    def create(self, validated_data):
        purchased_items_obj_data = validated_data.pop('purchased_items_obj')

        CustomerData = Customer.objects.create(**validated_data)

        itemsPurchasedInstance = []
        
        for purchased_item_obj_data in purchased_items_obj_data:
            itemsPurchased_id = purchased_item_obj_data.pop('id', None)
            itemsPurchased, _ = ItemPurchased.objects.get_or_create(id=itemsPurchased_id, defaults=purchased_item_obj_data)
            itemsPurchasedInstance.append(itemsPurchased)
        
        CustomerData.purchased_items_obj.add(*itemsPurchasedInstance)
        return CustomerData

    def update(self, instance, validated_data):
        purchased_items_obj = validated_data.pop('purchased_items_obj')

        itemPurchased = (instance.purchased_items_obj).all().delete()

        instance.customer_name = validated_data.get('customer_name', instance.customer_name)
        instance.contact_no = validated_data.get('contact_no', instance.contact_no)
        instance.email = validated_data.get('email', instance.email)
        instance.total_amount = validated_data.get('total_amount', instance.total_amount)
        instance.save()

        itemsPurchasedInstance = []
        for purchased_item_obj_data in purchased_items_obj:
            itemsPurchased_id = purchased_item_obj_data.pop('id', None)
            itemsPurchased, _ = ItemPurchased.objects.get_or_create(id=itemsPurchased_id, defaults=purchased_item_obj_data)
            itemsPurchasedInstance.append(itemsPurchased)
        instance.purchased_items_obj.set(itemsPurchasedInstance)

        return instance
