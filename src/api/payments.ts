import { useMutation } from '@tanstack/react-query';
import { api } from './axios';

export interface CalculatePaymentRequest {
    parkingAreaId: string;
    startTime: string;
    endTime: string;
}

export interface PaymentDto {
    amount: number;
    currency: string;
}

export const useCalculatePayment = () =>
    useMutation<PaymentDto, Error, CalculatePaymentRequest>({
        mutationFn: async (request: CalculatePaymentRequest) => {
            const response = await api().post<PaymentDto>('/payments/calculate', request);
            return response.data;
        },
    });
