from django.db import models
from users.models import User
import uuid


class CartItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items')
    product_id = models.CharField(max_length=100)
    name = models.CharField(max_length=255)
    price = models.IntegerField(default=0)
    image = models.CharField(max_length=500, blank=True)
    origin = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=100, blank=True)
    quantity = models.IntegerField(default=1)

    class Meta:
        unique_together = ('user', 'product_id')