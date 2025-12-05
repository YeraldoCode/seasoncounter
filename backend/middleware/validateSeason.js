// Middleware to validate season data
const validateSeasonData = (req, res, next) => {
    const { 
        game, 
        seasonName, 
        seasonNumber, 
        startDate, 
        endDate 
    } = req.body;

    // Check required fields
    const missingFields = [];
    if (!game) missingFields.push('game');
    if (!seasonName) missingFields.push('seasonName');
    if (!seasonNumber) missingFields.push('seasonNumber');
    if (!startDate) missingFields.push('startDate');
    if (!endDate) missingFields.push('endDate');

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: 'Missing required fields',
            missingFields
        });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime())) {
        return res.status(400).json({
            message: 'Invalid start date format'
        });
    }

    if (isNaN(end.getTime())) {
        return res.status(400).json({
            message: 'Invalid end date format'
        });
    }

    if (end <= start) {
        return res.status(400).json({
            message: 'End date must be after start date'
        });
    }

    // Validate season number
    if (typeof seasonNumber !== 'number' || seasonNumber <= 0) {
        return res.status(400).json({
            message: 'Season number must be a positive number'
        });
    }

    next();
};

module.exports = validateSeasonData;
