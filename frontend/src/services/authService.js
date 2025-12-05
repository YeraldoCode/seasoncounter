import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const authService = {
    // Login
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Register
    register: async (username, email, password) => {
        try {
            const response = await axios.post(`${API_URL}/register`, { username, email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Get current user
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Get token
    getToken: () => {
        return localStorage.getItem('token');
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // Check if user is admin
    isAdmin: () => {
        const user = authService.getCurrentUser();
        return user && user.role === 'admin';
    }
};
