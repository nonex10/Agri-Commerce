import hmac
import hashlib
import base64
import uuid
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from .models import Order


class InitiateEsewaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        order_id = request.data.get('orderId')
        try:
            order = Order.objects.get(pk=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        amount = order.total
        transaction_uuid = str(uuid.uuid4())
        product_code = settings.ESEWA_MERCHANT_CODE

        # eSewa v2 signature: HMAC-SHA256
        message = f"total_amount={amount},transaction_uuid={transaction_uuid},product_code={product_code}"
        secret = settings.ESEWA_SECRET_KEY.encode('utf-8')
        signature = base64.b64encode(
            hmac.new(secret, message.encode('utf-8'), hashlib.sha256).digest()
        ).decode('utf-8')

        params = {
            'amount': str(amount),
            'tax_amount': '0',
            'total_amount': str(amount),
            'transaction_uuid': transaction_uuid,
            'product_code': product_code,
            'product_service_charge': '0',
            'product_delivery_charge': '0',
            'success_url': settings.ESEWA_SUCCESS_URL,
            'failure_url': settings.ESEWA_FAILURE_URL,
            'signed_field_names': 'total_amount,transaction_uuid,product_code',
            'signature': signature,
        }

        return Response(params)


class InitiateKhaltiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        order_id = request.data.get('orderId')
        try:
            order = Order.objects.get(pk=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        payload = {
            'return_url': settings.KHALTI_SUCCESS_URL,
            'website_url': 'http://localhost:3000',
            'amount': order.total * 100,  # Khalti uses paisa
            'purchase_order_id': order.id,
            'purchase_order_name': f'AgriFresh Order {order.id}',
        }

        headers = {
            'Authorization': f'Key {settings.KHALTI_SECRET_KEY}',
            'Content-Type': 'application/json',
        }

        try:
            resp = requests.post(settings.KHALTI_GATEWAY_URL, json=payload, headers=headers)
            data = resp.json()
            if resp.status_code == 200 and 'payment_url' in data:
                return Response({'payment_url': data['payment_url']})
            return Response(
                {'message': data.get('detail', 'Khalti initiation failed')},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)