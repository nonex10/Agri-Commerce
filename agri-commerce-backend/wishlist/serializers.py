from rest_framework import serializers
from .models import WishlistItem


class WishlistItemSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='product_id')
    inStock = serializers.SerializerMethodField()

    class Meta:
        model = WishlistItem
        fields = ['id', 'name', 'price', 'image', 'origin', 'category', 'description', 'rating', 'reviews', 'inStock']

    def get_inStock(self, obj):
        return True


def build_wishlist_response(user):
    items = WishlistItem.objects.filter(user=user)
    return {'items': WishlistItemSerializer(items, many=True).data}