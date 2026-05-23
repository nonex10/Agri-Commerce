from django.db import models
from users.models import User
import uuid


def generate_order_id():
    import random
    import string
    chars = string.ascii_uppercase + string.digits
    suffix = ''.join(random.choices(chars, k=6))
    return f'ORD-{suffix}'


class Order(models.Model):
    STATUS_CHOICES = [
        ('Processing', 'Processing'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ]

    id = models.CharField(
        primary_key=True,
        max_length=20,
        default=generate_order_id,
        editable=False
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    items = models.JSONField(default=list)
    subtotal = models.IntegerField(default=0)
    vat = models.IntegerField(default=0)
    total = models.IntegerField(default=0)
    shipping_address = models.JSONField(default=dict)
    payment_method = models.CharField(max_length=50, default='COD')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Processing')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.id} - {self.user.name}'