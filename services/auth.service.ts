import { apiClient, ApiResponse } from './api-client';

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: 'customer' | 'admin';
    }
    
    export interface LoginPayload {
    email: string;
    password: string;
    }
    
    export interface SignupPayload {
    name: string;
    email: string;
    password: string;
    }
    
    export interface AuthResponse {
    user: AuthUser;
    token: string;
    }
    
    export const authService = {
    /**
     * Login — backend sets HTTP-only cookie, returns user object only.
     */
    login: (payload: LoginPayload): Promise<ApiResponse<AuthResponse>> => {
        return apiClient.post<AuthResponse>('/auth/login', payload);
    },
    
    /**
     * Signup — backend sets HTTP-only cookie, returns created user object only.
     */
    signup: (payload: SignupPayload): Promise<ApiResponse<AuthResponse>> => {
        return apiClient.post<AuthResponse>('/auth/signup', payload);
    },
    
    /**
     * Logout — backend clears the HTTP-only cookie.
     */
    logout: (): Promise<ApiResponse<{ success: boolean }>> => {
        return apiClient.post<{ success: boolean }>('/auth/logout', {});
    },
    
    /**
     * Fetch the currently logged-in user from the backend session.
     * Called on app load to restore user state.
     */
    getProfile: (): Promise<ApiResponse<AuthUser>> => {
        return apiClient.get<AuthUser>('/auth/profile');
    },
    
    /**
     * Update profile fields.
     */
    updateProfile: (updates: Partial<AuthUser>): Promise<ApiResponse<AuthUser>> => {
        return apiClient.put<AuthUser>('/auth/profile', updates);
    },
};