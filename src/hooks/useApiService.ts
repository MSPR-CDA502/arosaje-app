import { useStorageState } from '@/hooks/useStorageState';
import axios from 'axios';

export const useApiService = () => {
    const [[isLoading, session], setSession] = useStorageState('session');

    // Create an instance of axios
    const api = axios.create({
        baseURL: 'https://arosaje.nimzero.fr/api', // replace with your API's base URL
    });

    // Add a request interceptor to include headers
    api.interceptors.request.use(
        config => {
            if (session) {
                config.headers['Authorization'] = `Bearer ${session}`; // use the token from the hook
            }
            config.headers['Content-Type'] = 'application/json'; // example of another header
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    // Example GET request
    const getUsers = async () => {
        try {
            const response = await api.get('/users'); // replace with your endpoint
            return response.data;
        } catch (error) {
            console.error('Error fetching data', error);
            throw error;
        }
    };

    // Example POST request
    const postExampleData = async (data: any) => {
        try {
            const response = await api.post('/example-endpoint', data); // replace with your endpoint and data
            return response.data;
        } catch (error) {
            console.error('Error posting data', error);
            throw error;
        }
    };

    // Return the api methods you need
    return {
        getUsers,
        postExampleData,
    };
};
