import axios from 'axios';
import axiosInstance from '../config/axios';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/seasons`;

export const seasonService = {
    // Get all seasons (public)
    getAllSeasons: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching seasons:', error);
            throw error;
        }
    },

    // Get season by game name (public)
    getSeasonByGame: async (gameName) => {
        try {
            const response = await axios.get(`${API_URL}/${gameName}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching season for ${gameName}:`, error);
            throw error;
        }
    },

    // Create new season (protected - admin only)
    createSeason: async (seasonData) => {
        try {
            const response = await axiosInstance.post('/seasons', seasonData);
            return response.data;
        } catch (error) {
            console.error('Error creating season:', error);
            throw error;
        }
    },

    // Update season (protected - admin only)
    updateSeason: async (game, seasonData) => {
        try {
            const response = await axiosInstance.put(`/seasons/${encodeURIComponent(game)}`, seasonData);
            return response.data;
        } catch (error) {
            console.error('Error updating season:', error);
            throw error;
        }
    },

    // Delete season (protected - admin only)
    deleteSeason: async (gameName) => {
        try {
            const response = await axiosInstance.delete(`/seasons/${encodeURIComponent(gameName)}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting season:', error);
            throw error;
        }
    }
};
