
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export type ApiResponse<T> = {
    data: T | null;
    error: string | null;
    status: number;
    };

    async function request<T>(
    endpoint: string,
    options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
    const url = `${BASE_URL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    // Attach auth token if present
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth-token');
        if (token) {
        (defaultHeaders as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }
    }

    try {
        const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
        });

        if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        return {
            data: null,
            error: errorBody.message || `Request failed with status ${response.status}`,
            status: response.status,
        };
        }

        const data: T = await response.json();
        return { data, error: null, status: response.status };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Network error';
        return { data: null, error: message, status: 0 };
    }
    }

    export const apiClient = {
    get: <T>(endpoint: string, options?: RequestInit) =>
        request<T>(endpoint, { ...options, method: 'GET' }),

    post: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
        request<T>(endpoint, {
        ...options,
        method: 'POST',
        body: JSON.stringify(body),
        }),

    put: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
        request<T>(endpoint, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(body),
        }),

    patch: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
        request<T>(endpoint, {
        ...options,
        method: 'PATCH',
        body: JSON.stringify(body),
        }),

    delete: <T>(endpoint: string, options?: RequestInit) =>
        request<T>(endpoint, { ...options, method: 'DELETE' }),
};
