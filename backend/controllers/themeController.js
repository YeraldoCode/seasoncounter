const Theme = require('../models/Theme');

// Get active theme
const getActiveTheme = async (req, res) => {
    try {
        const theme = await Theme.findOne({ isActive: true });
        
        if (!theme) {
            // Return default theme if none is active
            return res.json({
                name: 'default',
                season: 'default',
                colors: {
                    primary: '#1a202c',
                    secondary: '#2d3748',
                    accent: '#48bb78',
                    background: '#0f1419',
                    text: '#e2e8f0'
                },
                isActive: true
            });
        }
        
        res.json(theme);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching theme', error: error.message });
    }
};

// Get all themes
const getAllThemes = async (req, res) => {
    try {
        const themes = await Theme.find().sort({ createdAt: -1 });
        res.json(themes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching themes', error: error.message });
    }
};

// Create theme
const createTheme = async (req, res) => {
    try {
        const { name, season, colors } = req.body;

        const theme = new Theme({
            name,
            season,
            colors,
            isActive: false
        });

        await theme.save();

        res.status(201).json({
            message: 'Theme created successfully',
            theme
        });
    } catch (error) {
        res.status(400).json({ message: 'Error creating theme', error: error.message });
    }
};

// Update theme
const updateTheme = async (req, res) => {
    try {
        const { name, season, colors } = req.body;

        const theme = await Theme.findByIdAndUpdate(
            req.params.id,
            { name, season, colors },
            { new: true, runValidators: true }
        );

        if (!theme) {
            return res.status(404).json({ message: 'Theme not found' });
        }

        res.json({
            message: 'Theme updated successfully',
            theme
        });
    } catch (error) {
        res.status(400).json({ message: 'Error updating theme', error: error.message });
    }
};

// Set active theme
const setActiveTheme = async (req, res) => {
    try {
        // Deactivate all themes
        await Theme.updateMany({}, { isActive: false });

        // Activate selected theme
        const theme = await Theme.findByIdAndUpdate(
            req.params.id,
            { isActive: true },
            { new: true }
        );

        if (!theme) {
            return res.status(404).json({ message: 'Theme not found' });
        }

        res.json({
            message: 'Theme activated successfully',
            theme
        });
    } catch (error) {
        res.status(500).json({ message: 'Error activating theme', error: error.message });
    }
};

// Delete theme
const deleteTheme = async (req, res) => {
    try {
        const theme = await Theme.findById(req.params.id);

        if (!theme) {
            return res.status(404).json({ message: 'Theme not found' });
        }

        if (theme.isActive) {
            return res.status(400).json({ message: 'Cannot delete active theme' });
        }

        await theme.deleteOne();

        res.json({ message: 'Theme deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting theme', error: error.message });
    }
};

module.exports = {
    getActiveTheme,
    getAllThemes,
    createTheme,
    updateTheme,
    setActiveTheme,
    deleteTheme
};
