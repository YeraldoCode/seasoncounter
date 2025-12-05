import axios from 'axios';
import { authService } from './authService';

const API_URL = 'http://localhost:5000/api/users';

// Add token to requests
const getAuthHeader = () => {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const userService = {
    // Get all users
    getAllUsers: async () => {
        try {
            const response = await axios.get(API_URL, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get user by ID
    getUserById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Update user
    updateUser: async (id, userData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, userData, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Delete user
    deleteUser: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Toggle user status
    toggleUserStatus: async (id) => {
        try {
            const response = await axios.patch(`${API_URL}/${id}/toggle-status`, {}, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};
