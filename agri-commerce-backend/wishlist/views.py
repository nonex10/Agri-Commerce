from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import WishlistItem
from .serializers import build_wishlist_response


class WishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(build_wishlist_response(request.user))

    def delete(self, request):
        WishlistItem.objects.filter(user=request.user).delete()
        return Response({'success': True})


class WishlistItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = str(request.data.get('productId', ''))
        item, _ = WishlistItem.objects.get_or_create(
            user=request.user,
            product_id=product_id,
            defaults={
                'name': request.data.get('name', ''),
                'price': int(request.data.get('price', 0)),
                'image': request.data.get('image', ''),
                'origin': request.data.get('origin', ''),
                'category': request.data.get('category', ''),
                'description': request.data.get('description', ''),
                'rating': request.data.get('rating', 0),
                'reviews': request.data.get('reviews', 0),
            }
        )
        return Response(build_wishlist_response(request.user))

    def delete(self, request, product_id):
        try:
            WishlistItem.objects.get(user=request.user, product_id=product_id).delete()
            return Response(build_wishlist_response(request.user))
        except WishlistItem.DoesNotExist:
            return Response({'message': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)