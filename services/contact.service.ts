import { apiClient, ApiResponse } from './api-client';

export interface ContactPayload {
    name: string;
    email: string;
    subject: string;
    reason: string;
    message: string;
    }

    export interface ContactResponse {
    success: boolean;
    message: string;
    }

    export const contactService = {
    /**
     * Submit the contact form.
     */
    submit: (payload: ContactPayload): Promise<ApiResponse<ContactResponse>> => {
        return apiClient.post<ContactResponse>('/contact', payload);
    },
};
