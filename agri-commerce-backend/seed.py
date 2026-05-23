import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'agrifresh_backend.settings')
django.setup()

from users.models import User
from products.models import Product

# Create admin user
if not User.objects.filter(email='admin@agrifresh.com').exists():
    User.objects.create_superuser(
        email='admin@agrifresh.com',
        name='Admin',
        password='admin123',
    )
    print('Admin created: admin@agrifresh.com / admin123')

# Create test customer
if not User.objects.filter(email='customer@agrifresh.com').exists():
    User.objects.create_user(
        email='customer@agrifresh.com',
        name='Test Customer',
        password='customer123',
        role='customer',
    )
    print('Customer created: customer@agrifresh.com / customer123')

# Products matching frontend exactly
products_data = [
    {'name': 'Organic Tomatoes',     'description': 'Fresh, juicy organic tomatoes grown without pesticides. Locally sourced from Nepal | availability may vary by region.',                                      'price': 120, 'category': 'Vegetables', 'origin': 'Dhading, Bagmati Province',        'rating': 4.8, 'reviews': 234, 'image': '/images/tomatoes.jpg'},
    {'name': 'Fresh Carrots',        'description': 'Crunchy orange carrots, perfect for salads and cooking. Available from farms in Nepal | local sourcing may vary by region.',                               'price': 95,  'category': 'Vegetables', 'origin': 'Sindhupalchok, Bagmati Province', 'rating': 4.6, 'reviews': 189, 'image': '/images/carrots.jpg'},
    {'name': 'Apple Variety Pack',   'description': "Mix of Red, Green, and Golden Delicious apples. Fresh from Nepal's highlands | availability may vary by region.",                                          'price': 280, 'category': 'Fruits',     'origin': 'Mustang, Gandaki Province',      'rating': 4.9, 'reviews': 412, 'image': '/images/apples.jpg'},
    {'name': 'Organic Strawberries', 'description': 'Sweet, ripe strawberries picked fresh. Available in season from local farms in Nepal | sourcing may vary by region.',                                     'price': 450, 'category': 'Fruits',     'origin': 'Nuwakot, Bagmati Province',      'rating': 4.7, 'reviews': 356, 'image': '/images/strawberries.jpg'},
    {'name': 'Whole Wheat Flour',    'description': 'Stone-ground whole wheat flour for baking and everyday cooking. Sourced from local mills in Nepal | availability may vary.',                              'price': 85,  'category': 'Grains',      'origin': 'Jumla, Karnali Province',        'rating': 4.5, 'reviews': 123, 'image': '/images/wheat.jpg'},
    {'name': 'Fresh Milk',           'description': 'Pure, fresh milk from healthy cows. Collected from dairy farms across Nepal | availability may vary by region.',                                          'price': 110, 'category': 'Dairy',      'origin': 'Chitwan, Bagmati Province',      'rating': 4.8, 'reviews': 298, 'image': '/images/milk.jpg'},
    {'name': 'Organic Spinach',      'description': 'Fresh organic spinach, great for smoothies and salads. Grown without chemicals from local farms in Nepal.',                                               'price': 60,  'category': 'Vegetables', 'origin': 'Dhading, Bagmati Province',      'rating': 4.6, 'reviews': 167, 'image': '/images/spinach.jpg'},
    {'name': 'Fresh Broccoli',       'description': 'Crisp, green broccoli florets. Freshly harvested and available from farms in Nepal | availability may vary.',                                            'price': 140, 'category': 'Vegetables', 'origin': 'Sindhupalchok, Bagmati Province', 'rating': 4.7, 'reviews': 145, 'image': '/images/broccoli.jpg'},
    {'name': 'Bananas (Bunch)',      'description': 'Golden ripe bananas, perfect for smoothies and snacks. Widely available from farms across Nepal.',                                                        'price': 120, 'category': 'Fruits',     'origin': 'Chitwan, Bagmati Province',      'rating': 4.5, 'reviews': 201, 'image': '/images/bananas.jpg'},
    {'name': 'Cheese Block',         'description': 'Artisanal cheese made from fresh local milk. Crafted by dairy producers in Nepal | availability may vary.',                                               'price': 950, 'category': 'Dairy',      'origin': 'Solukhumbu, Koshi Province',     'rating': 4.9, 'reviews': 89,  'image': '/images/cheese.jpg'},
    {'name': 'Lettuce Head',         'description': 'Crisp, tender lettuce leaves. Freshly grown and available from local farms in Nepal | availability may vary.',                                           'price': 75,  'category': 'Vegetables', 'origin': 'Kavrepalanchok, Bagmati Province','rating': 4.6, 'reviews': 112, 'image': '/images/lettuce.jpg'},
    {'name': 'Pumpkins',             'description': 'Large, orange pumpkins for seasonal cooking. Commonly grown across Nepal | availability may vary by region.',                                             'price': 50,  'category': 'Vegetables', 'origin': 'Nawalparasi, Gandaki Province',   'rating': 4.7, 'reviews': 78,  'image': '/images/pumpkin.jpg'},
    {'name': 'Honey Jar',            'description': 'Pure, raw honey from local bees. Sourced from beekeepers across Nepal | availability may vary by region.',                                               'price': 850, 'category': 'Organic',    'origin': 'Lamjung, Gandaki Province',      'rating': 4.9, 'reviews': 234, 'image': '/images/honey.jpg'},
    {'name': 'Vegetable Seeds Pack', 'description': "Quality vegetable seeds suited for home gardening in Nepal's climate | availability may vary by region.",                                                 'price': 45,  'category': 'Seeds',       'origin': 'Bhaktapur, Bagmati Province',    'rating': 4.4, 'reviews': 56,  'image': '/images/seeds.jpg'},
    {'name': 'Fresh Peaches',        'description': "Juicy, sweet peaches in season. Grown in Nepal's mid-hill regions | seasonal availability may vary by region.",                                          'price': 180, 'category': 'Fruits',     'origin': 'Palpa, Lumbini Province',        'rating': 4.8, 'reviews': 203, 'image': '/images/peaches.jpg'},
]

for p in products_data:
    product, created = Product.objects.get_or_create(
        name=p['name'],
        defaults={**p, 'in_stock': True}
    )
    if created:
        print(f'Product created: {p["name"]}')

print('\nSeed complete!')
print('Admin:    admin@agrifresh.com / admin123')
print('Customer: customer@agrifresh.com / customer123')