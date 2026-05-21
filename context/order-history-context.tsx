'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
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
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  getOrder: (orderId: string) => Order | undefined;
  cancelOrder: (orderId: string) => void;
}

const OrderHistoryContext = createContext<OrderHistoryContextType | undefined>(undefined);

export function OrderHistoryProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem('agri-orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Failed to load orders from localStorage:', error);
      }
    } else {
      // Seed with mock orders for demo purposes
      const mockOrders: Order[] = [
        {
          id: 'ORD-001',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: '1', name: 'Organic Tomatoes', price: 4.99, quantity: 2, category: 'Vegetables', image: '/images/tomatoes.jpg', description: '', farmer: 'Green Valley Farm', farmerId: 'f1', rating: 4.8, reviews: 234, inStock: true },
            { id: '6', name: 'Fresh Milk', price: 3.99, quantity: 1, category: 'Dairy', image: '/images/milk.jpg', description: '', farmer: 'Happy Cow Dairy', farmerId: 'f6', rating: 4.8, reviews: 298, inStock: true },
          ],
          total: 13.97,
          status: 'Delivered',
          shippingAddress: '123 Main St, Springfield',
          paymentMethod: 'Credit Card',
        },
        {
          id: 'ORD-002',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: '3', name: 'Apple Variety Pack', price: 7.99, quantity: 1, category: 'Fruits', image: '/images/apples.jpg', description: '', farmer: 'Orchard Hills', farmerId: 'f3', rating: 4.9, reviews: 412, inStock: true },
            { id: '13', name: 'Honey Jar', price: 9.99, quantity: 1, category: 'Organic', image: '/images/honey.jpg', description: '', farmer: 'Beehive Valley', farmerId: 'f10', rating: 4.9, reviews: 234, inStock: true },
          ],
          total: 17.98,
          status: 'Shipped',
          shippingAddress: '123 Main St, Springfield',
          paymentMethod: 'PayPal',
        },
        {
          id: 'ORD-003',
          date: new Date().toISOString(),
          items: [
            { id: '8', name: 'Fresh Broccoli', price: 3.99, quantity: 3, category: 'Vegetables', image: '/images/broccoli.jpg', description: '', farmer: 'Sunrise Farm', farmerId: 'f2', rating: 4.7, reviews: 145, inStock: true },
          ],
          total: 11.97,
          status: 'Processing',
          shippingAddress: '123 Main St, Springfield',
          paymentMethod: 'Credit Card',
        },
      ];
      setOrders(mockOrders);
      localStorage.setItem('agri-orders', JSON.stringify(mockOrders));
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('agri-orders', JSON.stringify(orders));
    }
  }, [orders, isHydrated]);

  const addOrder = (order: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const getOrder = (orderId: string) => orders.find((o) => o.id === orderId);

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId && o.status === 'Processing'
          ? { ...o, status: 'Cancelled' }
          : o
      )
    );
  };

  return (
    <OrderHistoryContext.Provider value={{ orders, addOrder, getOrder, cancelOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
}

export function useOrderHistory() {
  const context = useContext(OrderHistoryContext);
  if (context === undefined) {
    throw new Error('useOrderHistory must be used within an OrderHistoryProvider');
  }
  return context;
}
