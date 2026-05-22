'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ordersService } from '@/services';
import { CartItem } from '@/types';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: string;
  paymentMethod: string;
}

interface OrderHistoryContextType {
  orders: Order[];
  isLoading: boolean;
  cancelOrder: (orderId: string) => Promise<void>;
  refetch: () => Promise<void>;
}

const OrderHistoryContext = createContext<OrderHistoryContextType | undefined>(undefined);

export function OrderHistoryProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    const { data } = await ordersService.getAll();
    if (data?.orders) {
      setOrders(data.orders as unknown as Order[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (orderId: string) => {
    const { data } = await ordersService.cancel(orderId);
    if (data) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: 'Cancelled' } : o))
      );
    }
  };

  return (
    <OrderHistoryContext.Provider value={{ orders, isLoading, cancelOrder, refetch: fetchOrders }}>
      {children}
    </OrderHistoryContext.Provider>
  );
}

export function useOrderHistory() {
  const ctx = useContext(OrderHistoryContext);
  if (!ctx) throw new Error('useOrderHistory must be used within an OrderHistoryProvider');
  return ctx;
}