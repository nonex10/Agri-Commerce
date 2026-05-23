from django.urls import path
from .views import ProductListView, ProductDetailView, ProductCategoriesView, FarmerListView

urlpatterns = [
    path('', ProductListView.as_view(), name='product-list'),
    path('/', ProductListView.as_view(), name='product-list-slash'),
    path('categories', ProductCategoriesView.as_view(), name='product-categories'),
    path('<uuid:pk>', ProductDetailView.as_view(), name='product-detail'),
    path('farmers', FarmerListView.as_view(), name='farmer-list'),
]