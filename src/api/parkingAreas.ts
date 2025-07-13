import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './axios';
import { v4 } from 'uuid';

export interface ParkingArea {
    id: string;
    name: string;
    weekdayRate: number;
    weekendRate: number;
    discountPercentage: number;
}

export const useParkingAreas = () =>
    useQuery({
        queryKey: ['parkingAreas'],
        queryFn: async () => {
            const res = await api().get<ParkingArea[]>('/parkingareas');
            return res.data;
        },
    });

export const useCreateParkingArea = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<ParkingArea, 'id'>) => {
            return api().post('/parkingareas', data)
        },

        onMutate: async (newArea) => {
            await queryClient.cancelQueries({ queryKey: ['parkingAreas'] });

            const prevData = queryClient.getQueryData<ParkingArea[]>(['parkingAreas']);

            const fakeArea: ParkingArea = {
                ...newArea,
                id: v4(),
            };

            queryClient.setQueryData<ParkingArea[]>(['parkingAreas'], (old) => [
                ...(old ?? []),
                fakeArea,
            ]);

            return { prevData };
        },

        onError: (_err, _newArea, context) => {
            if (context?.prevData) {
                queryClient.setQueryData(['parkingAreas'], context.prevData);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['parkingAreas'] });
        },
    });
};


export const useUpdateParkingArea = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...data }: ParkingArea) => api().put(`${id}`, data),

        onMutate: (item) => {
            queryClient.cancelQueries({ queryKey: ['parkingAreas'] });
            const prevData = queryClient.getQueryData<ParkingArea>(['parkingAreas']);
            queryClient.setQueryData<ParkingArea[]>(['parkingAreas'], prev =>
                (prev ?? []).map(x => x.id === item.id ? item : x)
            );

            return { prevData };
        },

        onError: (_err, _item, context) => {
            if (context?.prevData) {
                queryClient.setQueryData(['parkingAreas'], context.prevData);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['parkingAreas'] })
        }
    });
};

export const useDeleteParkingArea = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => api().delete(`/${id}`),

        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['parkingAreas'] });

            const prevData = queryClient.getQueryData<ParkingArea[]>(['parkingAreas']);

            queryClient.setQueryData<ParkingArea[]>(['parkingAreas'], prev =>
                (prev ?? []).filter(x => x.id !== id)
            );

            return { prevData };
        },

        onError: (_err, _id, context) => {
            if (context?.prevData) {
                queryClient.setQueryData(['parkingAreas'], context.prevData);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['parkingAreas'] });
        },

    });
};
