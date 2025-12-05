const Season = require('../models/Season');

// Get all seasons
const getSeasons = async (req, res) => {
    try {
        const seasons = await Season.find().sort({ game: 1 });
        res.json(seasons);
    } catch (error) {
        console.error('Error fetching seasons:', error);
        res.status(500).json({ message: 'Error fetching seasons', error: error.message });
    }
};

// Get a specific season by game name
const getSeasonByGame = async (req, res) => {
    try {
        const gameName = req.params.game;
        const season = await Season.findOne({ 
            game: { $regex: new RegExp(`^${gameName}$`, 'i') } // Case-insensitive search
        });
        
        if (!season) {
            return res.status(404).json({ 
                message: `Season not found for game: ${gameName}` 
            });
        }
        
        res.json(season);
    } catch (error) {
        console.error(`Error fetching season for ${req.params.game}:`, error);
        res.status(500).json({ message: 'Error fetching season', error: error.message });
    }
};

// Create or Update a season
const updateSeason = async (req, res) => {
    try {
        const { 
            game, 
            seasonName, 
            seasonNumber, 
            startDate, 
            endDate, 
            targetDate, 
            displayStartDate, 
            displayEndDate 
        } = req.body;

        // Validation
        if (!game || !seasonName || !seasonNumber || !startDate || !endDate) {
            return res.status(400).json({ 
                message: 'Missing required fields',
                required: ['game', 'seasonName', 'seasonNumber', 'startDate', 'endDate']
            });
        }

        const season = await Season.findOneAndUpdate(
            { game },
            {
                game,
                seasonName,
                seasonNumber,
                startDate,
                endDate,
                targetDate: targetDate || endDate,
                displayStartDate,
                displayEndDate
            },
            { new: true, upsert: true, runValidators: true }
        );
        
        res.json({ 
            message: 'Season updated successfully',
            season 
        });
    } catch (error) {
        console.error('Error updating season:', error);
        res.status(400).json({ 
            message: 'Error updating season', 
            error: error.message 
        });
    }
};

// Delete a season
const deleteSeason = async (req, res) => {
    try {
        const gameName = req.params.game;
        const season = await Season.findOneAndDelete({ 
            game: { $regex: new RegExp(`^${gameName}$`, 'i') }
        });
        
        if (!season) {
            return res.status(404).json({ 
                message: `Season not found for game: ${gameName}` 
            });
        }
        
        res.json({ 
            message: 'Season deleted successfully',
            deletedSeason: season
        });
    } catch (error) {
        console.error(`Error deleting season for ${req.params.game}:`, error);
        res.status(500).json({ message: 'Error deleting season', error: error.message });
    }
};

// Get active seasons (seasons that haven't ended yet)
const getActiveSeasons = async (req, res) => {
    try {
        const now = new Date();
        const seasons = await Season.find({
            endDate: { $gte: now }
        }).sort({ endDate: 1 });
        
        res.json(seasons);
    } catch (error) {
        console.error('Error fetching active seasons:', error);
        res.status(500).json({ message: 'Error fetching active seasons', error: error.message });
    }
};

module.exports = {
    getSeasons,
    getSeasonByGame,
    updateSeason,
    deleteSeason,
    getActiveSeasons
};
