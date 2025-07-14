import { useMutation } from "@tanstack/react-query";
import { PaymentDto } from "./payments";
import { api } from "./axios";

export const useConvertCurrency = () =>
    useMutation<PaymentDto, Error, ConvertCurrencyRequest>({
        mutationFn: async (request: ConvertCurrencyRequest) => {
            const response = await api().post<PaymentDto>('/currency/convert', request);
            return response.data;
        },
    });


export interface ConvertCurrencyRequest {
    fromCurrency: string;
    toCurrency: string;
    amount: number;
    date: string;
}
