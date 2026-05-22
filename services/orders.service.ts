import { apiClient, ApiResponse } from './api-client';
import { CartItem, Address } from '@/types';

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    subtotal: number;
    vat: number;
    shippingAddress: Address;
    paymentMethod: string;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    }

    export interface PlaceOrderPayload {
    items: CartItem[];
    shippingAddress: Address;
    paymentMethod: string;
    subtotal: number;
    vat: number;
    total: number;
    }

    export interface OrdersResponse {
    orders: Order[];
    total: number;
    }

    export const ordersService = {
    /**
     * Place a new order.
     */
    place: (payload: PlaceOrderPayload): Promise<ApiResponse<Order>> => {
        return apiClient.post<Order>('/orders', payload);
    },

    /**
     * Fetch all orders for the authenticated user.
     */
    getAll: (): Promise<ApiResponse<OrdersResponse>> => {
        return apiClient.get<OrdersResponse>('/orders');
    },

    /**
     * Fetch a single order by ID.
     */
    getById: (orderId: string): Promise<ApiResponse<Order>> => {
        return apiClient.get<Order>(`/orders/${orderId}`);
    },

    /**
     * Cancel an order by ID (only valid while status is 'pending' or 'confirmed').
     */
    cancel: (orderId: string): Promise<ApiResponse<Order>> => {
        return apiClient.patch<Order>(`/orders/${orderId}/cancel`, {});
    },
};
