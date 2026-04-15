import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { FarmerCard } from '@/components/farmer-card';
import { Button } from '@/components/ui/button';
import { MOCK_PRODUCTS, MOCK_FARMERS } from '@/lib/constants';
import Link from 'next/link';
import { Leaf, Truck, Award } from 'lucide-react';

export default function Home() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Fresh from Farm to Your Table
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
                Connect directly with local farmers and enjoy fresh, organic produce delivered straight to your doorstep. Support sustainable agriculture while eating healthier.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/products">
                  <Button size="lg" className="px-8">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/farmers">
                  <Button size="lg" variant="outline" className="px-8">
                    Meet Our Farmers
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Why Choose AgriFresh?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  100% Fresh & Organic
                </h3>
                <p className="text-muted-foreground">
                  All our products are sourced directly from certified organic farms with no pesticides or chemicals.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Truck className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Fast Delivery
                </h3>
                <p className="text-muted-foreground">
                  Get your fresh produce within 24-48 hours with our efficient farm-to-door delivery network.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Certified Quality
                </h3>
                <p className="text-muted-foreground">
                  Every product is quality-tested and certified. We stand behind the freshness guarantee.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  Featured Products
                </h2>
                <p className="text-muted-foreground mt-2">
                  Discover our most popular items this season
                </p>
              </div>
              <Link href="/products">
                <Button variant="outline">View All</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Farmers */}
        <section className="py-16 md:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  Meet Our Farmers
                </h2>
                <p className="text-muted-foreground mt-2">
                  These dedicated farmers grow the freshest produce
                </p>
              </div>
              <Link href="/farmers">
                <Button variant="outline">View All</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_FARMERS.map((farmer) => (
                <FarmerCard
                  key={farmer.id}
                  name={farmer.name}
                  location={farmer.location}
                  description={farmer.description}
                  avatar={farmer.avatar}
                  rating={farmer.rating}
                  reviews={farmer.reviews}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Eat Fresher?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join thousands of customers who are enjoying fresh, organic produce directly from local farms.
            </p>
            <Link href="/products">
              <Button size="lg" variant="secondary" className="px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
