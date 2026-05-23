from django.urls import path
from .views import WishlistView, WishlistItemView

urlpatterns = [
    path('', WishlistView.as_view(), name='wishlist'),
    path('/', WishlistView.as_view(), name='wishlist-slash'),
    path('items', WishlistItemView.as_view(), name='wishlist-items'),
    path('items/<str:product_id>', WishlistItemView.as_view(), name='wishlist-item-detail'),
]