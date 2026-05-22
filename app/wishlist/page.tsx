'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useWishlist } from '@/context/wishlist-context';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (product: (typeof items)[0]) => {
    addItem(product, 1);
    removeItem(product.id);
  };

  const handleAddAllToCart = () => {
    items.forEach((product) => addItem(product, 1));
    clearWishlist();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-linear-to-br from-primary/10 to-accent/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-8 h-8 text-primary fill-primary" />
              <h1 className="text-4xl font-bold text-foreground">My Wishlist</h1>
            </div>
            <p className="text-muted-foreground">
              {items.length} saved item{items.length !== 1 ? 's' : ''}
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
                <p className="text-muted-foreground mb-8">
                  Save items you love by clicking the heart icon on any product.
                </p>
                <Button asChild>
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
            ) : (
              <>
                {/* Actions bar */}
                <div className="flex items-center justify-between mb-8">
                  <p className="text-muted-foreground text-sm">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" onClick={clearWishlist}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                    <Button size="sm" onClick={handleAddAllToCart}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add All to Cart
                    </Button>
                  </div>
                </div>

                {/* Wishlist grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {items.map((product) => (
                    <div
                      key={product.id}
                      className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                      {/* Image */}
                      <Link href={`/products/${product.id}`} className="block relative h-48 bg-muted overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-semibold">
                          {product.category}
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-4 flex flex-col grow">
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-semibold text-card-foreground hover:text-primary transition-colors line-clamp-1 mb-1">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-muted-foreground mb-2">{product.farmer}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-accent text-accent'
                                  : 'text-muted'
                              }`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                        </div>

                        <div className="flex items-center justify-between mt-auto gap-2">
                          <span className="text-xl font-bold text-primary">Rs. {product.price.toLocaleString('en-NP')}</span>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => removeItem(product.id)}
                              title="Remove from wishlist"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => handleMoveToCart(product)}
                              title="Move to cart"
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
