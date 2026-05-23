from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ContactSerializer


class ContactView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'message': 'Your message has been received. We will respond within 24 hours.'
            }, status=status.HTTP_200_OK)
        return Response(
            {'message': list(serializer.errors.values())[0][0]},
            status=status.HTTP_400_BAD_REQUEST
        )