import axios, { AxiosInstance } from 'axios';
import { config } from '../config';

let apiInstance: AxiosInstance | null = null;

export function api(): AxiosInstance {
    if (!apiInstance) {
        apiInstance = axios.create({
            baseURL: config().apiUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    return apiInstance;
}
