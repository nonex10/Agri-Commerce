from django.urls import path
from .views import DashboardStatsView, DashboardProductListView, DashboardProductDetailView

urlpatterns = [
    path('stats', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('products', DashboardProductListView.as_view(), name='dashboard-products'),
    path('products/<uuid:pk>', DashboardProductDetailView.as_view(), name='dashboard-product-detail'),
]