from django.db import models
import uuid


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Vegetables', 'Vegetables'),
        ('Fruits', 'Fruits'),
        ('Grains', 'Grains'),
        ('Dairy', 'Dairy'),
        ('Organic', 'Organic'),
        ('Seeds', 'Seeds'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.IntegerField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    image = models.CharField(max_length=500, blank=True, default='')
    origin = models.CharField(max_length=255, blank=True, default='')
    rating = models.FloatField(default=0.0)
    reviews = models.IntegerField(default=0)
    in_stock = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name