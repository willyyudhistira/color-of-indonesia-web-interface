import axios from 'axios';
import { useAuth } from '../hooks/AuthContext'; // Sesuaikan path jika perlu

const useApi = () => {
    const { token } = useAuth();

    const api = axios.create({
        baseURL: 'http://localhost:4000/api', // Sesuaikan dengan base URL API Anda
    });

    // Menambahkan interceptor untuk menyisipkan token di setiap request
    api.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return api;
};

export default useApi;