from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Order
from .serializers import OrderSerializer


class OrderListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
        return Response({
            'orders': OrderSerializer(orders, many=True).data,
            'total': orders.count(),
        })

    def post(self, request):
        data = request.data
        items = data.get('items', [])

        if not items:
            return Response({'message': 'No items in order'}, status=status.HTTP_400_BAD_REQUEST)

        # Sanitize items — keep only needed fields
        clean_items = []
        for item in items:
            clean_items.append({
                'id': str(item.get('id', '')),
                'name': item.get('name', ''),
                'price': item.get('price', 0),
                'quantity': item.get('quantity', 1),
                'image': item.get('image', ''),
                'farmer': item.get('farmer', ''),
                'origin': item.get('origin', ''),
            })

        order = Order.objects.create(
            user=request.user,
            items=clean_items,
            subtotal=int(data.get('subtotal', 0)),
            vat=int(data.get('vat', 0)),
            total=int(data.get('total', 0)),
            shipping_address=data.get('shippingAddress', {}),
            payment_method=data.get('paymentMethod', 'COD'),
        )

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            order = Order.objects.get(pk=pk, user=request.user)
            return Response(OrderSerializer(order).data)
        except Order.DoesNotExist:
            return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)


class OrderCancelView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            order = Order.objects.get(pk=pk, user=request.user)
            if order.status != 'Processing':
                return Response(
                    {'message': 'Only orders with status Processing can be cancelled'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            order.status = 'Cancelled'
            order.save()
            return Response(OrderSerializer(order).data)
        except Order.DoesNotExist:
            return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)