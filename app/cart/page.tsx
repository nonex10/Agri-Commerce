'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import Link from 'next/link';
import { Trash2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground">
              Review your items before checkout
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-6">
                  Your cart is empty
                </p>
                <Link href="/products">
                  <Button className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="bg-card rounded-lg overflow-hidden">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-6 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
                      >
                        {/* Image */}
                        <div className="relative w-24 h-24 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <Link href={`/products/${item.id}`} className="hover:text-primary">
                              <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground">
                              {item.farmer}
                            </p>
                          </div>
                          <p className="text-lg font-bold text-primary">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex flex-col items-end gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-border rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                            >
                              +
                            </button>
                          </div>

                          {/* Total and Delete */}
                          <div className="flex flex-col items-end gap-2">
                            <p className="text-lg font-bold text-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive/80 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-card rounded-lg p-6 shadow-sm sticky top-24 h-fit">
                    <h2 className="text-xl font-bold text-foreground mb-6">
                      Order Summary
                    </h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>${getTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Tax</span>
                        <span>${(getTotal() * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary">
                          ${(getTotal() * 1.08).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Link href="/checkout">
                      <Button className="w-full mb-3">
                        Proceed to Checkout
                      </Button>
                    </Link>
                    <Link href="/products">
                      <Button variant="outline" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
