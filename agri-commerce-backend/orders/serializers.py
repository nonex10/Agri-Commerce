from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    userId = serializers.CharField(source='user.id')
    shippingAddress = serializers.JSONField(source='shipping_address')
    paymentMethod = serializers.CharField(source='payment_method')
    createdAt = serializers.DateTimeField(source='created_at')
    updatedAt = serializers.DateTimeField(source='updated_at')
    date = serializers.DateTimeField(source='created_at')

    class Meta:
        model = Order
        fields = [
            'id', 'userId', 'items', 'subtotal', 'vat', 'total',
            'shippingAddress', 'paymentMethod', 'status',
            'createdAt', 'updatedAt', 'date'
        ]