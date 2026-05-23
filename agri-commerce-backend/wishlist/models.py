from django.db import models
from users.models import User
import uuid


class WishlistItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wishlist_items')
    product_id = models.CharField(max_length=100)
    name = models.CharField(max_length=255)
    price = models.IntegerField(default=0)
    image = models.CharField(max_length=500, blank=True)
    origin = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    rating = models.FloatField(default=0)
    reviews = models.IntegerField(default=0)

    class Meta:
        unique_together = ('user', 'product_id')