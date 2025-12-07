import axiosInstance from '../config/axios';

export const userService = {
    // Get all users
    getAllUsers: async () => {
        try {
            const response = await axiosInstance.get('/users');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get user by ID
    getUserById: async (id) => {
        try {
            const response = await axiosInstance.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Update user
    updateUser: async (id, userData) => {
        try {
            const response = await axiosInstance.put(`/users/${id}`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Delete user
    deleteUser: async (id) => {
        try {
            const response = await axiosInstance.delete(`/users/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Toggle user status
    toggleUserStatus: async (id) => {
        try {
            const response = await axiosInstance.patch(`/users/${id}/toggle-status`, {});
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};
