import axios from 'axios';
import { authService } from '../services/authService';

// Get API URL from environment variable or use localhost as fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const axiosInstance = axios.create({
    baseURL: `${API_URL}/api`
});

// Request interceptor to add token automatically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = authService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Token added to request:', token.substring(0, 20) + '...');
        } else {
            console.warn('No token found in localStorage');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized - Token may have expired');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
