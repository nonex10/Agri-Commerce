'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/cart-context';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground text-lg mb-6">
              Your cart is empty
            </p>
            <Link href="/products">
              <Button className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="bg-card rounded-lg shadow-lg p-12 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Order Placed!
            </h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your order. We&apos;ll deliver your fresh produce within 24-48 hours.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Order ID: {Math.random().toString(36).substring(7).toUpperCase()}
            </p>
            <Button onClick={() => router.push('/')} className="w-full">
              Return to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground">Checkout</h1>
          </div>
        </section>

        {/* Checkout Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Shipping Form */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Shipping Address
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />

                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />

                    <Input
                      type="text"
                      name="street"
                      placeholder="Street Address"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Link href="/cart" className="flex-1">
                        <Button variant="outline" className="w-full gap-2">
                          <ArrowLeft className="w-4 h-4" />
                          Back to Cart
                        </Button>
                      </Link>
                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1"
                      >
                        {isProcessing ? 'Processing...' : 'Place Order'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg p-6 shadow-sm sticky top-24 h-fit">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Order Summary
                  </h2>

                  {/* Items */}
                  <div className="space-y-4 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-sm">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-bold text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3">
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
                    <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">
                        ${(getTotal() * 1.08).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
