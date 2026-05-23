from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    inStock = serializers.BooleanField(source='in_stock')

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'category',
            'image', 'origin', 'rating', 'reviews', 'inStock'
        ]