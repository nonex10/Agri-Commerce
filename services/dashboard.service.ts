import { apiClient, ApiResponse } from './api-client';
import { Product } from '@/types';
import { Order } from './orders.service';

export interface DashboardStats {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    recentOrders: Order[];
    }

    export interface CreateProductPayload {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    inStock: boolean;
    }

    export const dashboardService = {
    /**
     * Fetch seller dashboard stats (products, orders, revenue).
     */
    getStats: (): Promise<ApiResponse<DashboardStats>> => {
        return apiClient.get<DashboardStats>('/dashboard/stats');
    },

    /**
     * Fetch all products listed by the authenticated seller.
     */
    getProducts: (): Promise<ApiResponse<Product[]>> => {
        return apiClient.get<Product[]>('/dashboard/products');
    },

    /**
     * Create a new product listing.
     */
    createProduct: (payload: CreateProductPayload): Promise<ApiResponse<Product>> => {
        return apiClient.post<Product>('/dashboard/products', payload);
    },

    /**
     * Update an existing product listing.
     */
    updateProduct: (
        id: string,
        payload: Partial<CreateProductPayload>
    ): Promise<ApiResponse<Product>> => {
        return apiClient.put<Product>(`/dashboard/products/${id}`, payload);
    },

    /**
     * Delete a product listing.
     */
    deleteProduct: (id: string): Promise<ApiResponse<{ success: boolean }>> => {
        return apiClient.delete<{ success: boolean }>(`/dashboard/products/${id}`);
    },
};
