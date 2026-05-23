from rest_framework import serializers
from .models import CartItem


class CartItemSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='product_id')
    inStock = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'name', 'price', 'image', 'origin', 'category', 'quantity', 'inStock']

    def get_inStock(self, obj):
        return True


def build_cart_response(user):
    items = CartItem.objects.filter(user=user)
    serialized = CartItemSerializer(items, many=True)
    subtotal = sum(i.price * i.quantity for i in items)
    vat = round(subtotal * 0.13)
    return {
        'items': serialized.data,
        'subtotal': subtotal,
        'vat': vat,
        'total': subtotal + vat,
    }