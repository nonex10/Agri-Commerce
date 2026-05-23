from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import CartItem
from .serializers import build_cart_response


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(build_cart_response(request.user))

    def delete(self, request):
        CartItem.objects.filter(user=request.user).delete()
        return Response({'success': True})


class CartItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = str(request.data.get('productId', ''))
        quantity = int(request.data.get('quantity', 1))

        item, created = CartItem.objects.get_or_create(
            user=request.user,
            product_id=product_id,
            defaults={
                'name': request.data.get('name', ''),
                'price': int(request.data.get('price', 0)),
                'image': request.data.get('image', ''),
                'origin': request.data.get('origin', ''),
                'category': request.data.get('category', ''),
                'quantity': quantity,
            }
        )
        if not created:
            item.quantity += quantity
            item.save()

        return Response(build_cart_response(request.user))

    def put(self, request, product_id):
        quantity = int(request.data.get('quantity', 1))
        try:
            item = CartItem.objects.get(user=request.user, product_id=product_id)
            if quantity <= 0:
                item.delete()
            else:
                item.quantity = quantity
                item.save()
            return Response(build_cart_response(request.user))
        except CartItem.DoesNotExist:
            return Response({'message': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, product_id):
        try:
            CartItem.objects.get(user=request.user, product_id=product_id).delete()
            return Response(build_cart_response(request.user))
        except CartItem.DoesNotExist:
            return Response({'message': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)