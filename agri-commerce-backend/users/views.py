from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import SignupSerializer, LoginSerializer, UserSerializer
from .models import User


def set_auth_cookie(response, token):
    response.set_cookie(
        key='token',
        value=token,
        httponly=True,
        samesite='Lax',
        secure=False,
        max_age=60 * 60 * 24 * 7,
    )
    return response


def get_token_for_user(user):
    refresh = RefreshToken.for_user(user)
    return str(refresh.access_token)


class SignupView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = get_token_for_user(user)
            response = Response(
                {'user': UserSerializer(user).data},
                status=status.HTTP_201_CREATED
            )
            set_auth_cookie(response, token)
            return response
        first_error = list(serializer.errors.values())[0][0]
        return Response({'message': str(first_error)}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token = get_token_for_user(user)
            response = Response({'user': UserSerializer(user).data})
            set_auth_cookie(response, token)
            return response
        first_error = list(serializer.errors.values())[0][0]
        return Response({'message': str(first_error)}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = []

    def post(self, request):
        response = Response({'success': True})
        response.delete_cookie('token')
        return response


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(
            {'message': list(serializer.errors.values())[0][0]},
            status=status.HTTP_400_BAD_REQUEST
        )