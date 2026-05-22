import { apiClient, ApiResponse } from './api-client';
import { Product } from '@/types';

export interface WishlistResponse {
    items: Product[];
    }

    export const wishlistService = {
    /**
     * Fetch the authenticated user's wishlist.
     */
    get: (): Promise<ApiResponse<WishlistResponse>> => {
        return apiClient.get<WishlistResponse>('/wishlist');
    },

    /**
     * Add a product to the wishlist.
     */
    addItem: (productId: string): Promise<ApiResponse<WishlistResponse>> => {
        return apiClient.post<WishlistResponse>('/wishlist/items', { productId });
    },

    /**
     * Remove a product from the wishlist.
     */
    removeItem: (productId: string): Promise<ApiResponse<WishlistResponse>> => {
        return apiClient.delete<WishlistResponse>(`/wishlist/items/${productId}`);
    },

    /**
     * Clear the entire wishlist.
     */
    clear: (): Promise<ApiResponse<{ success: boolean }>> => {
        return apiClient.delete<{ success: boolean }>('/wishlist');
    },
};
