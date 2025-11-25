import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const authService = {
    login: async (username, password) => {
        const response = await axios.post(`${API_URL}/auth/login`, { username, password });
        if (response.data.token) {
            localStorage.setItem('adminToken', response.data.token);
            localStorage.setItem('adminUser', JSON.stringify(response.data.admin));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('adminUser');
        return user ? JSON.parse(user) : null;
    },

    getToken: () => {
        return localStorage.getItem('adminToken');
    }
};

const seasonService = {
    getAllSeasons: async () => {
        const response = await axios.get(`${API_URL}/seasons`);
        return response.data;
    },

    updateSeason: async (seasonData) => {
        const token = authService.getToken();
        const response = await axios.post(`${API_URL}/seasons`, seasonData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};

export { authService, seasonService };
