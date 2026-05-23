from django.urls import path
from .views import CartView, CartItemView

urlpatterns = [
    path('', CartView.as_view(), name='cart'),
    path('/', CartView.as_view(), name='cart-slash'),
    path('items', CartItemView.as_view(), name='cart-items'),
    path('items/<str:product_id>', CartItemView.as_view(), name='cart-item-detail'),
]