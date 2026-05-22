'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { MOCK_PRODUCTS } from '@/lib/constants';
import { productsService } from '@/services';
import { Product } from '@/types';
import Link from 'next/link';
import { Leaf, Truck, Award } from 'lucide-react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(
    MOCK_PRODUCTS.slice(0, 6)
  );

  useEffect(() => {
    productsService.getAll({ limit: 6 }).then(({ data }) => {
      if (data?.products?.length) setFeaturedProducts(data.products);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-linear-to-br from-primary/10 to-accent/10 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Fresh from Farm to Your Table
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Connect directly with local farmers across Nepal and enjoy fresh produce delivered to your doorstep.
            </p>
            <Link href="/products">
              <Button size="lg" className="px-8">Shop Now</Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose AgriFresh?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Leaf className="w-8 h-8 text-primary" />, title: '100% Fresh & Organic', desc: 'Sourced directly from local farms across Nepal with no unnecessary chemicals.' },
                { icon: <Truck className="w-8 h-8 text-accent" />, title: 'Fast Delivery', desc: 'Get your fresh produce within 24–48 hours with our farm-to-door delivery network.' },
                { icon: <Award className="w-8 h-8 text-primary" />, title: 'Certified Quality', desc: 'Every product is quality-tested and certified. We stand behind freshness.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">{icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Featured Products</h2>
                <p className="text-muted-foreground mt-2">Discover our most popular items this season</p>
              </div>
              <Link href="/products"><Button variant="outline">View All</Button></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Eat Fresher?</h2>
            <p className="text-lg opacity-90 mb-8">
              Join thousands of customers across Nepal enjoying fresh produce directly from local farms.
            </p>
            <Link href="/products">
              <Button size="lg" variant="secondary" className="px-8">Start Shopping</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
