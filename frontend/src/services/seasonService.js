import axios from 'axios';

const API_URL = 'http://localhost:5000/api/seasons';

export const seasonService = {
    // Get all seasons
    getAllSeasons: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching seasons:', error);
            throw error;
        }
    },

    // Get season by game name
    getSeasonByGame: async (gameName) => {
        try {
            const response = await axios.get(`${API_URL}/${gameName}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching season for ${gameName}:`, error);
            throw error;
        }
    },

    // Update or create season
    updateSeason: async (seasonData) => {
        try {
            const response = await axios.post(API_URL, seasonData);
            return response.data;
        } catch (error) {
            console.error('Error updating season:', error);
            throw error;
        }
    }
};
