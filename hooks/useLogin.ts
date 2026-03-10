import { useMutation } from '@tanstack/react-query';
import { api } from '../utils/api';
import { LoginFormData } from '../utils/validations';

interface LoginResponse {
    message: string;
    user: {
        id: number;
        name: string;
        role: string;
    };
    token: string;
}

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: LoginFormData) => {
            const response = await api.post<LoginResponse>('/api/login', data);
            return response.data;
        },
    });
};
