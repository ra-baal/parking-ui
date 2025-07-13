import { useMutation } from '@tanstack/react-query';
import { api } from './axios';

export interface PaymentRequest {
    parkingAreaId: string;
    startTime: string;
    endTime: string;
}

export interface PaymentResultDto {
    amountUSD: number;
    amountEUR: number | null;
    amountPLN: number | null;
}

export const useCalculatePayment = () =>
    useMutation<PaymentResultDto, Error, PaymentRequest>({
        mutationFn: async (request: PaymentRequest) => {
            const response = await api().post<PaymentResultDto>('/payments/calculate', request);
            return response.data;
        },
    });
