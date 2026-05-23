from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .models import Product
from .serializers import ProductSerializer


class ProductListView(APIView):
    permission_classes = []

    def get(self, request):
        queryset = Product.objects.all()

        category = request.query_params.get('category')
        search = request.query_params.get('search')
        min_price = request.query_params.get('minPrice')
        max_price = request.query_params.get('maxPrice')
        in_stock = request.query_params.get('inStock')
        page = int(request.query_params.get('page', 1))
        limit = int(request.query_params.get('limit', 20))

        if category:
            queryset = queryset.filter(category=category)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(description__icontains=search) | Q(origin__icontains=search)
            )
        if min_price:
            queryset = queryset.filter(price__gte=int(min_price))
        if max_price:
            queryset = queryset.filter(price__lte=int(max_price))
        if in_stock is not None:
            queryset = queryset.filter(in_stock=in_stock.lower() == 'true')

        total = queryset.count()
        start = (page - 1) * limit
        products = queryset[start:start + limit]

        serializer = ProductSerializer(products, many=True)
        return Response({
            'products': serializer.data,
            'total': total,
            'page': page,
            'limit': limit,
        })

    def post(self, request):
        if not request.user.is_authenticated or request.user.role != 'admin':
            return Response({'message': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'message': list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)


class ProductDetailView(APIView):
    permission_classes = []

    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            return Response(ProductSerializer(product).data)
        except Product.DoesNotExist:
            return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response({'message': list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            product.delete()
            return Response({'success': True})
        except Product.DoesNotExist:
            return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


class ProductCategoriesView(APIView):
    permission_classes = []

    def get(self, request):
        return Response([c[0] for c in Product.CATEGORY_CHOICES])


class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from orders.models import Order
        from orders.serializers import OrderSerializer
        orders = Order.objects.all()
        revenue = sum(o.total for o in orders)
        recent = Order.objects.order_by('-created_at')[:5]
        return Response({
            'totalProducts': Product.objects.count(),
            'totalOrders': orders.count(),
            'totalRevenue': revenue,
            'recentOrders': OrderSerializer(recent, many=True).data,
        })


class DashboardProductListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.all()
        return Response(ProductSerializer(products, many=True).data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'message': list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)


class DashboardProductDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response({'message': list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            product.delete()
            return Response({'success': True})
        except Product.DoesNotExist:
            return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)