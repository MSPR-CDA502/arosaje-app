import { useSession } from '@/context/AuthContext';
import { useStorageState } from '@/hooks/useStorageState';
import axios from 'axios';

export const useApiService = () => {
    const {session} = useSession();

    console.log(session)

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
            if (!config.headers['Content-Type']) {
                config.headers['Content-Type'] = 'application/json'; // example of another header
            }
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

    const getMyself = async () => {
        try {
            let response = await api.get('/me');
            return response.data;
        } catch (error) {
            console.error('Error fetching data', error);
            throw error;
        }
    };

    const getPlant = async (idPlant: string) => {
        try {
            let response = await api.get('/plants/'+idPlant);
            return response.data;
        } catch (error) {
            console.error('Error fetching data', error);
            throw error;
        }
    };

    const getAddress = async (idAddress: string) => {
        try {
            let response = await api.get('/addresses/'+idAddress);
            return response.data;
        } catch (error) {
            console.error('Error fetching data', error);
            throw error;
        }
    };

    const postAddress = async (data: any) => {
        try {
            const response = await api.post('/addresses', data, {headers: {
                'Accept': 'application/ld+json'
              }});
            return response.data;
        } catch (error) {
            console.error('Error fetching data', error);
            throw error;
        }
    };

    const postPhoto = async (data: any) => {
        try {
            console.log(data)
            const response = await api.post('/photos', data, {headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/ld+json'
              }});
            return response.data;
        } catch (error) {
            console.error('Error fetching data', error);
            throw error;
        }
    };

    const postPlant = async (data: any) => {
        try {
            console.log(data)
            const response = await api.post('/plants', data, {headers: {
                'Content-Type': 'application/ld+json',
                'Accept': 'application/ld+json'
              }});
            return response.data;
        } catch (error) {
            console.error('Error fetching data', error);
            throw error;
        }
    };

    const patchPlant = async (idPlant: string, data: any) => {
        try {
            const response = await api.patch('/plants/'+idPlant, data, {headers: {
                'Content-Type': 'application/merge-patch+json',
                'Accept': 'application/ld+json'
              }});
            return response.data;
        } catch (error) {
            console.error('Error fetching data', error);
            throw error;
        }
    };


    // Return the api methods you need
    return {
        getMyself,
        getPlant,
        getAddress,
        postPhoto,
        postPlant,
        patchPlant,
        postAddress,
        getUsers,
        postExampleData,
    };
};
