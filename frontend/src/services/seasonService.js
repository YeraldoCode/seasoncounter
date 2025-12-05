import axios from 'axios';
import { authService } from './authService';

const API_URL = 'http://localhost:5000/api/seasons';

const getAuthHeader = () => {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

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

    // Update or create season (protected - admin only)
    updateSeason: async (seasonData) => {
        try {
            const response = await axios.post(API_URL, seasonData, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error updating season:', error);
            throw error;
        }
    },

    // Delete season (protected - admin only)
    deleteSeason: async (gameName) => {
        try {
            const response = await axios.delete(`${API_URL}/${gameName}`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting season:', error);
            throw error;
        }
    }
};
