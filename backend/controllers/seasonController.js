const Season = require('../models/Season');

// Get all seasons
const getSeasons = async (req, res) => {
    try {
        const seasons = await Season.find();
        res.json(seasons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific season by game name
const getSeasonByGame = async (req, res) => {
    try {
        const season = await Season.findOne({ game: req.params.game });
        if (!season) {
            return res.status(404).json({ message: 'Season not found' });
        }
        res.json(season);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create or Update a season
const updateSeason = async (req, res) => {
    try {
        const { game } = req.body;
        const season = await Season.findOneAndUpdate(
            { game },
            req.body,
            { new: true, upsert: true } // Create if doesn't exist
        );
        res.json(season);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getSeasons,
    getSeasonByGame,
    updateSeason
};
