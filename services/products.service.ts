import { apiClient, ApiResponse } from './api-client';
import { Product } from '@/types';

export interface ProductsFilter {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    page?: number;
    limit?: number;
    }

    export interface ProductsResponse {
    products: Product[];
    total: number;
    page: number;
    limit: number;
    }

    export interface CreateProductPayload {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    inStock: boolean;
    }

    export const productsService = {
    /**
     * Fetch all products, with optional filtering/pagination.
     */
    getAll: (filters: ProductsFilter = {}): Promise<ApiResponse<ProductsResponse>> => {
        const params = new URLSearchParams();
        if (filters.category) params.set('category', filters.category);
        if (filters.search) params.set('search', filters.search);
        if (filters.minPrice !== undefined) params.set('minPrice', String(filters.minPrice));
        if (filters.maxPrice !== undefined) params.set('maxPrice', String(filters.maxPrice));
        if (filters.inStock !== undefined) params.set('inStock', String(filters.inStock));
        if (filters.page !== undefined) params.set('page', String(filters.page));
        if (filters.limit !== undefined) params.set('limit', String(filters.limit));

        const query = params.toString();
        return apiClient.get<ProductsResponse>(`/products${query ? `?${query}` : ''}`);
    },

    /**
     * Fetch a single product by ID.
     */
    getById: (id: string): Promise<ApiResponse<Product>> => {
        return apiClient.get<Product>(`/products/${id}`);
    },

    /**
     * Fetch products belonging to a specific farmer/seller.
     */
    getByFarmer: (farmerId: string): Promise<ApiResponse<Product[]>> => {
        return apiClient.get<Product[]>(`/products?farmerId=${farmerId}`);
    },

    /**
     * Create a new product (seller/dashboard use).
     */
    create: (payload: CreateProductPayload): Promise<ApiResponse<Product>> => {
        return apiClient.post<Product>('/products', payload);
    },

    /**
     * Update an existing product by ID.
     */
    update: (id: string, payload: Partial<CreateProductPayload>): Promise<ApiResponse<Product>> => {
        return apiClient.put<Product>(`/products/${id}`, payload);
    },

    /**
     * Delete a product by ID.
     */
    delete: (id: string): Promise<ApiResponse<{ success: boolean }>> => {
        return apiClient.delete<{ success: boolean }>(`/products/${id}`);
    },

    /**
     * Fetch all available product categories.
     */
    getCategories: (): Promise<ApiResponse<string[]>> => {
        return apiClient.get<string[]>('/products/categories');
    },
};
