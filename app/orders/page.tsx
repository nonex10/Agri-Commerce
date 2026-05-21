'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useOrderHistory, Order } from '@/context/order-history-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Package,
  ChevronDown,
  ChevronUp,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  ShoppingBag,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const STATUS_CONFIG: Record<Order['status'], { color: string; icon: React.ReactNode; label: string }> = {
  Processing: {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: <Clock className="w-3.5 h-3.5" />,
    label: 'Processing',
  },
  Shipped: {
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: <Truck className="w-3.5 h-3.5" />,
    label: 'Shipped',
  },
  Delivered: {
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    label: 'Delivered',
  },
  Cancelled: {
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: <XCircle className="w-3.5 h-3.5" />,
    label: 'Cancelled',
  },
};

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const { cancelOrder } = useOrderHistory();
  const statusConfig = STATUS_CONFIG[order.status];

  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Order header */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-foreground">{order.id}</span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}
              >
                {statusConfig.icon}
                {statusConfig.label}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">Placed on {formattedDate}</p>
            <p className="text-xs text-muted-foreground">{order.shippingAddress}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:flex-col sm:items-end">
          <span className="text-xl font-bold text-primary">${order.total.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground">{order.items.reduce((s, i) => s + i.quantity, 0)} item{order.items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Preview thumbnails */}
      <div className="px-5 pb-4 flex items-center gap-2">
        <div className="flex -space-x-2">
          {order.items.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="w-9 h-9 rounded-full border-2 border-background bg-muted overflow-hidden shrink-0"
            >
              <Image src={item.image} alt={item.name} width={36} height={36} className="object-cover w-full h-full" />
            </div>
          ))}
          {order.items.length > 4 && (
            <div className="w-9 h-9 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
              +{order.items.length - 4}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {order.status === 'Processing' && (
            <Button
              variant="outline"
              size="sm"
              className="text-destructive border-destructive/30 hover:bg-destructive/10"
              onClick={() => cancelOrder(order.id)}
            >
              Cancel
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="gap-1"
          >
            {expanded ? (
              <>Hide details <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>View details <ChevronDown className="w-4 h-4" /></>
            )}
          </Button>
        </div>
      </div>

      {/* Expanded items */}
      {expanded && (
        <div className="border-t border-border">
          <div className="divide-y divide-border">
            {order.items.map((item) => (
              <div key={item.id} className="px-5 py-4 flex items-center gap-4">
                <div className="relative w-16 h-16 bg-muted rounded-lg overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.id}`} className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{item.farmer}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="px-5 py-4 bg-muted/30 border-t border-border">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-semibold text-foreground border-t border-border pt-2 mt-2">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Paid via {order.paymentMethod}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderHistoryPage() {
  const { orders } = useOrderHistory();
  const [filter, setFilter] = useState<Order['status'] | 'All'>('All');

  const filtered = filter === 'All' ? orders : orders.filter((o) => o.status === filter);

  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Order History</h1>
            </div>
            <p className="text-muted-foreground">
              {orders.length} total order{orders.length !== 1 ? 's' : ''}
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {orders.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">No orders yet</h2>
                <p className="text-muted-foreground mb-8">Your order history will appear here once you place an order.</p>
                <Button asChild>
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <>
                {/* Filter tabs */}
                <div className="flex items-center gap-2 mb-8 flex-wrap">
                  {(['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilter(s)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        filter === s
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {s}
                      {s !== 'All' && statusCounts[s] ? (
                        <span className="ml-1.5 opacity-70">({statusCounts[s]})</span>
                      ) : null}
                      {s === 'All' && (
                        <span className="ml-1.5 opacity-70">({orders.length})</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Orders list */}
                {filtered.length === 0 ? (
                  <p className="text-center text-muted-foreground py-12">No {filter.toLowerCase()} orders found.</p>
                ) : (
                  <div className="space-y-4">
                    {filtered.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
