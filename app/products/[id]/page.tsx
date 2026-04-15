'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { MOCK_PRODUCTS } from '@/lib/constants';
import Link from 'next/link';
import { Star, Truck, CheckCircle, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addItem } = useCart();

  const product = MOCK_PRODUCTS.find((p) => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Product not found
            </h1>
            <Link href="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/products" className="inline-flex items-center gap-2 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </div>
        </div>

        {/* Product Detail */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image */}
              <div className="flex items-center justify-center bg-muted rounded-lg h-96 relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  {product.name}
                </h1>

                {/* Farmer */}
                <Link href="/farmers" className="text-primary hover:text-primary/80 mb-4">
                  {product.farmer}
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-accent text-accent'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-muted-foreground text-sm mb-1">Price</p>
                  <p className="text-5xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-8 space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>100% Organic & Fresh</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>No Pesticides or Chemicals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-primary" />
                    <span>Farm to Door within 24-48 Hours</span>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="mb-8">
                  {product.inStock ? (
                    <div className="text-green-600 font-semibold">In Stock</div>
                  ) : (
                    <div className="text-destructive font-semibold">Out of Stock</div>
                  )}
                </div>

                {/* Quantity and Add to Cart */}
                <div className="flex gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-16 text-center border-l border-r border-border bg-transparent text-foreground"
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      +
                    </button>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="flex-1"
                    disabled={!product.inStock}
                  >
                    {isAdded ? 'Added to Cart!' : 'Add to Cart'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <Link key={p.id} href={`/products/${p.id}`}>
                    <div className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                      <div className="relative h-48 bg-muted">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-2">
                          {p.name}
                        </h3>
                        <p className="text-lg font-bold text-primary">
                          ${p.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
