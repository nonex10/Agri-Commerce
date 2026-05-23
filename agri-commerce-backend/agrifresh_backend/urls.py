from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from users.views import LoginView, SignupView, LogoutView, ProfileView
from products.views import (
    ProductListView, ProductDetailView, ProductCategoriesView,
    DashboardStatsView, DashboardProductListView, DashboardProductDetailView
)
from cart.views import CartView, CartItemView
from orders.views import OrderListCreateView, OrderDetailView, OrderCancelView
from orders.payment_views import InitiateEsewaView, InitiateKhaltiView
from wishlist.views import WishlistView, WishlistItemView
from contact.views import ContactView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Auth
    path('api/auth/login', LoginView.as_view()),
    path('api/auth/signup', SignupView.as_view()),
    path('api/auth/logout', LogoutView.as_view()),
    path('api/auth/profile', ProfileView.as_view()),

    # Products
    path('api/products', ProductListView.as_view()),
    path('api/products/categories', ProductCategoriesView.as_view()),
    path('api/products/<str:pk>', ProductDetailView.as_view()),

    # Orders
    path('api/orders', OrderListCreateView.as_view()),
    path('api/orders/<str:pk>', OrderDetailView.as_view()),
    path('api/orders/<str:pk>/cancel', OrderCancelView.as_view()),

    # Payments
    path('api/payments/esewa/initiate', InitiateEsewaView.as_view()),
    path('api/payments/khalti/initiate', InitiateKhaltiView.as_view()),

    # Cart
    path('api/cart', CartView.as_view()),
    path('api/cart/items', CartItemView.as_view()),
    path('api/cart/items/<str:product_id>', CartItemView.as_view()),

    # Wishlist
    path('api/wishlist', WishlistView.as_view()),
    path('api/wishlist/items', WishlistItemView.as_view()),
    path('api/wishlist/items/<str:product_id>', WishlistItemView.as_view()),

    # Contact
    path('api/contact', ContactView.as_view()),

    # Dashboard
    path('api/dashboard/stats', DashboardStatsView.as_view()),
    path('api/dashboard/products', DashboardProductListView.as_view()),
    path('api/dashboard/products/<str:pk>', DashboardProductDetailView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)