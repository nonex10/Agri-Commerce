'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  MessageSquare,
  Truck,
  Sprout,
} from 'lucide-react';

const REASONS = [
  'General Inquiry',
  'Order Support',
  'Become a Farmer Partner',
  'Product Feedback',
  'Technical Issue',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    reason: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const reset = () => {
    setForm({ name: '', email: '', subject: '', reason: '', message: '' });
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Contact Us</h1>
            </div>
            <p className="text-muted-foreground">
              We&apos;d love to hear from you. Our team usually responds within 24 hours.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-6">Get in touch</h2>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <a href="mailto:hello@agrifresh.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          hello@agrifresh.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Phone</p>
                        <a href="tel:+18001234567" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          +1 (800) 123-4567
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Address</p>
                        <p className="text-sm text-muted-foreground">
                          123 Farm Lane, Sacramento<br />CA 95814, USA
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Business Hours</p>
                        <p className="text-sm text-muted-foreground">
                          Mon – Fri: 8am – 6pm PST<br />
                          Sat: 9am – 4pm PST
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick links */}
                <div className="border-t border-border pt-6 space-y-3">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Quick Help</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Truck className="w-4 h-4 text-primary" />
                      <span>Track your order in <a href="/orders" className="text-primary hover:underline">Order History</a></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Sprout className="w-4 h-4 text-primary" />
                      <span>Interested in selling? Choose &quot;Become a Farmer Partner&quot;</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                {submitted ? (
                  <div className="bg-card rounded-xl border border-border p-12 text-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-foreground mb-2">Message Sent!</h2>
                    <p className="text-muted-foreground mb-8">
                      Thank you, <span className="font-medium">{form.name}</span>! We&apos;ve received your message and will get back to you at <span className="font-medium">{form.email}</span> within 24 hours.
                    </p>
                    <Button onClick={reset} variant="outline">Send another message</Button>
                  </div>
                ) : (
                  <div className="bg-card rounded-xl border border-border p-8">
                    <h2 className="text-xl font-semibold text-foreground mb-6">Send us a message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Smith"
                            value={form.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="reason">Reason for Contact <span className="text-destructive">*</span></Label>
                        <select
                          id="reason"
                          name="reason"
                          value={form.reason}
                          onChange={handleChange}
                          required
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                        >
                          <option value="">Select a reason...</option>
                          {REASONS.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="subject">Subject <span className="text-destructive">*</span></Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="How can we help?"
                          value={form.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us more about your inquiry..."
                          value={form.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="resize-none"
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Send Message
                          </span>
                        )}
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
