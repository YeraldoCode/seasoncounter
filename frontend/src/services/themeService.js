import axios from 'axios';
import { authService } from './authService';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/themes`;

const getAuthHeader = () => {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const themeService = {
    // Get active theme (public)
    getActiveTheme: async () => {
        try {
            const response = await axios.get(`${API_URL}/active`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get all themes
    getAllThemes: async () => {
        try {
            const response = await axios.get(API_URL, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Create theme
    createTheme: async (themeData) => {
        try {
            const response = await axios.post(API_URL, themeData, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Update theme
    updateTheme: async (id, themeData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, themeData, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Set active theme
    setActiveTheme: async (id) => {
        try {
            const response = await axios.patch(`${API_URL}/${id}/activate`, {}, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Delete theme
    deleteTheme: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};
