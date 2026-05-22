import { apiClient, ApiResponse } from './api-client';
import { CartItem } from '@/types';

export interface CartResponse {
    items: CartItem[];
    subtotal: number;
    vat: number;
    total: number;
    }

    export interface AddToCartPayload {
    productId: string;
    quantity: number;
    }

    export interface UpdateCartPayload {
    productId: string;
    quantity: number;
    }

    export const cartService = {
    /**
     * Fetch the authenticated user's server-side cart.
     */
    get: (): Promise<ApiResponse<CartResponse>> => {
        return apiClient.get<CartResponse>('/cart');
    },

    /**
     * Add a product to the server-side cart.
     */
    addItem: (payload: AddToCartPayload): Promise<ApiResponse<CartResponse>> => {
        return apiClient.post<CartResponse>('/cart/items', payload);
    },

    /**
     * Update quantity of an item in the server-side cart.
     */
    updateItem: (payload: UpdateCartPayload): Promise<ApiResponse<CartResponse>> => {
        return apiClient.put<CartResponse>(`/cart/items/${payload.productId}`, {
        quantity: payload.quantity,
        });
    },

    /**
     * Remove a specific item from the server-side cart.
     */
    removeItem: (productId: string): Promise<ApiResponse<CartResponse>> => {
        return apiClient.delete<CartResponse>(`/cart/items/${productId}`);
    },

    /**
     * Clear all items from the server-side cart.
     */
    clear: (): Promise<ApiResponse<{ success: boolean }>> => {
        return apiClient.delete<{ success: boolean }>('/cart');
    },
};
