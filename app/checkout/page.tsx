'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/cart-context';
import { ordersService } from '@/services';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const VAT_RATE = 0.13;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '',
    toleVillage: '', 
    municipality: '', 
    district: '', 
    province: '', 
    country: 'Nepal',
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'eSewa' | 'Khalti'>('COD');
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const subtotal = getTotal();
  const vat = Math.round(subtotal * VAT_RATE);
  const total = subtotal + vat;

  if (items.length === 0 && !placedOrderId) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground text-lg mb-6">Your cart is empty</p>
            <Link href="/products">
              <Button className="gap-2"><ArrowLeft className="w-4 h-4" />Back to Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    // Adjusted properties explicitly to map perfectly to your service layer expectations without postal code
    const shippingAddress = {
      street: formData.toleVillage,
      city: formData.municipality,
      state: formData.province,
      district: formData.district,
      country: formData.country,
      phone: formData.phone,
    } as any; 

    const { data, error: apiError } = await ordersService.place({
      items,
      shippingAddress, 
      paymentMethod: paymentMethod as any,
      subtotal,
      vat,
      total,
    });

    if (data) {
      clearCart();

      if (paymentMethod === 'COD') {
        setPlacedOrderId(data.id);
        setIsProcessing(false);
      } 
      
      else if (paymentMethod === 'eSewa') {
        try {
          const { data: esewaParams } = await ordersService.initiateEsewa(data.id);
          if (!esewaParams) throw new Error("Failed to receive valid eSewa parameters.");

          const form = document.createElement("form");
          form.setAttribute("method", "POST");
          form.setAttribute("action", "https://rc-epay.esewa.com.np/api/epay/main/v2/form");

          for (const key in esewaParams) {
            const hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", esewaParams[key]);
            form.appendChild(hiddenField);
          }

          document.body.appendChild(form);
          form.submit();
        } catch (err: any) {
          setError(err.message || "eSewa initialization failed.");
          setIsProcessing(false);
        }
      } 
      
      else if (paymentMethod === 'Khalti') {
        try {
          const { data: khaltiData } = await ordersService.initiateKhalti(data.id);
          if (!khaltiData || !khaltiData.payment_url) {
            throw new Error("Failed to retrieve a valid transaction URL from Khalti.");
          }
          
          window.location.href = khaltiData.payment_url;
        } catch (err: any) {
          setError(err.message || "Khalti initialization failed.");
          setIsProcessing(false);
        }
      }
    } else {
      setError(apiError || 'Failed to place order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (placedOrderId) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="bg-card rounded-lg shadow-lg p-12 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Order Placed!</h1>
            <p className="text-muted-foreground mb-2">
              Thank you for your order. We&apos;ll deliver your fresh produce within 24–48 hours.
            </p>
            <p className="text-sm font-medium text-primary mb-6">Order ID: {placedOrderId}</p>
            <div className="flex flex-col gap-3">
              <Button onClick={() => router.push('/orders')} className="w-full">View My Orders</Button>
              <Button variant="outline" onClick={() => router.push('/')} className="w-full">Return to Home</Button>
            </div>
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
        <section className="bg-linear-to-br from-primary/10 to-accent/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground">Checkout</h1>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Shipping Address Input Section */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Shipping Address</h2>

                  {error && (
                    <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg mb-6 text-sm">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required />
                      <Input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required />
                      <Input type="tel" name="phone" placeholder="Phone Number (e.g. 98XXXXXXXX)" value={formData.phone} onChange={handleInputChange} required />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input type="text" name="toleVillage" placeholder="Tole / Village" value={formData.toleVillage} onChange={handleInputChange} required />
                      <Input type="text" name="municipality" placeholder="Municipality / Rural Municipality" value={formData.municipality} onChange={handleInputChange} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input type="text" name="district" placeholder="District" value={formData.district} onChange={handleInputChange} required />
                      <Input type="text" name="province" placeholder="Province" value={formData.province} onChange={handleInputChange} required />
                    </div>

                    {/* Payment Setup Layout */}
                    <div className="pt-2">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Payment Method</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[['COD', 'Cash on Delivery'], ['eSewa', 'eSewa'], ['Khalti', 'Khalti']].map(([value, label]) => (
                          <label
                            key={value}
                            className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                              paymentMethod === value
                                ? 'border-primary bg-primary/5 text-primary font-medium'
                                : 'border-border hover:bg-secondary'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={value}
                              checked={paymentMethod === value}
                              onChange={(e) => setPaymentMethod(e.target.value as any)}
                              className="accent-primary"
                            />
                            {label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Link href="/cart" className="flex-1">
                        <Button variant="outline" className="w-full gap-2">
                          <ArrowLeft className="w-4 h-4" />Back to Cart
                        </Button>
                      </Link>
                      <Button type="submit" disabled={isProcessing} className="flex-1">
                        {isProcessing ? 'Processing...' : 'Place Order'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Order Sticky Summary Panel */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg p-6 shadow-sm sticky top-24">
                  <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative w-16 h-16 bg-muted rounded overflow-hidden shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-sm font-bold text-primary">
                            Rs. {(item.price * item.quantity).toLocaleString('en-NP')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>Rs. {subtotal.toLocaleString('en-NP')}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>VAT (13%)</span>
                      <span>Rs. {vat.toLocaleString('en-NP')}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">Rs. {total.toLocaleString('en-NP')}</span>
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