from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'in_stock', 'origin']
    list_filter = ['category', 'in_stock']
    search_fields = ['name', 'description', 'origin']