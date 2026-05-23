import { apiClient, ApiResponse } from './api-client';
import { CartItem } from '@/types'; 

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    subtotal: number;
    vat: number;
    shippingAddress: string; 
    paymentMethod: 'COD' | 'eSewa' | 'Khalti'; 
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
}

export interface PlaceOrderPayload {
    items: CartItem[];
    shippingAddress: string; 
    paymentMethod: 'COD' | 'eSewa' | 'Khalti'; 
    subtotal: number;
    vat: number;
    total: number;
}

export interface OrdersResponse {
    orders: Order[];
    total: number;
}

export const ordersService = {
    place: (payload: PlaceOrderPayload): Promise<ApiResponse<Order>> => {
        return apiClient.post<Order>('/orders', payload);
    },

    getAll: (): Promise<ApiResponse<OrdersResponse>> => {
        return apiClient.get<OrdersResponse>('/orders');
    },

    getById: (orderId: string): Promise<ApiResponse<Order>> => {
        return apiClient.get<Order>(`/orders/${orderId}`);
    },

    cancel: (orderId: string): Promise<ApiResponse<Order>> => {
        return apiClient.patch<Order>(`/orders/${orderId}/cancel`, {});
    },

    /**
     * Initiate Khalti Payment
     */
    initiateKhalti: (orderId: string): Promise<ApiResponse<{ payment_url: string }>> => {
        return apiClient.post<{ payment_url: string }>(`/payments/khalti/initiate`, { orderId });
    },

    /**
     * Initiate eSewa Payment
     * Returns the signature and required form fields from the Django backend
     */
    initiateEsewa: (orderId: string): Promise<ApiResponse<any>> => {
        return apiClient.post<any>(`/payments/esewa/initiate`, { orderId });
    }
};