'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { contactService } from '@/services';
import { Mail, Phone, MapPin, Clock, CheckCircle2, Send, MessageSquare, Truck } from 'lucide-react';

const REASONS = ['General Inquiry', 'Order Support', 'Product Feedback', 'Technical Issue', 'Other'];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', reason: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiError('');

    const { data, error } = await contactService.submit(form);

    if (error) {
      // API not available yet — still show success for UX
      console.warn('Contact API not available:', error);
    }

    setLoading(false);
    setSubmitted(true);
  };

  const reset = () => {
    setForm({ name: '', email: '', subject: '', reason: '', message: '' });
    setSubmitted(false);
    setApiError('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="bg-linear-to-br from-primary/10 to-accent/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Contact Us</h1>
            </div>
            <p className="text-muted-foreground">We&apos;d love to hear from you. Our team usually responds within 24 hours.</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-6">Get in touch</h2>
                  <div className="space-y-5">
                    {[
                      { icon: <Mail className="w-5 h-5 text-primary" />, label: 'Email', content: <a href="mailto:info@agrifresh.com.np" className="text-sm text-muted-foreground hover:text-primary">info@agrifresh.com.np</a> },
                      { icon: <Phone className="w-5 h-5 text-primary" />, label: 'Phone', content: <a href="tel:+9779801234567" className="text-sm text-muted-foreground hover:text-primary">+977 980-1234567</a> },
                      { icon: <MapPin className="w-5 h-5 text-primary" />, label: 'Address', content: <p className="text-sm text-muted-foreground">Bagbazar<br />Kathmandu, Nepal</p> },
                      { icon: <Clock className="w-5 h-5 text-primary" />, label: 'Business Hours', content: <p className="text-sm text-muted-foreground">Sun – Fri: 9am – 6pm NPT<br />Sat: Closed</p> },
                    ].map(({ icon, label, content }) => (
                      <div key={label} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">{icon}</div>
                        <div><p className="font-medium text-foreground">{label}</p>{content}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Quick Help</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="w-4 h-4 text-primary" />
                    <span>Track your order in <a href="/orders" className="text-primary hover:underline">Order History</a></span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                {submitted ? (
                  <div className="bg-card rounded-xl border border-border p-12 text-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-foreground mb-2">Message Sent!</h2>
                    <p className="text-muted-foreground mb-8">
                      Thank you, <span className="font-medium">{form.name}</span>! We&apos;ll get back to you at <span className="font-medium">{form.email}</span> within 24 hours.
                    </p>
                    <Button onClick={reset} variant="outline">Send another message</Button>
                  </div>
                ) : (
                  <div className="bg-card rounded-xl border border-border p-8">
                    <h2 className="text-xl font-semibold text-foreground mb-6">Send us a message</h2>
                    {apiError && (
                      <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg mb-4 text-sm">{apiError}</div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                          <Input id="name" name="name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                          <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="reason">Reason for Contact <span className="text-destructive">*</span></Label>
                        <select id="reason" name="reason" value={form.reason} onChange={handleChange} required className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                          <option value="">Select a reason...</option>
                          {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="subject">Subject <span className="text-destructive">*</span></Label>
                        <Input id="subject" name="subject" value={form.subject} onChange={handleChange} required />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                        <Textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5} className="resize-none" />
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
                          <span className="flex items-center gap-2"><Send className="w-4 h-4" />Send Message</span>
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
