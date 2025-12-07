require('dotenv').config();
const mongoose = require('mongoose');
const Season = require('./models/Season');

const updateSeasonDates = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Actualizar las temporadas con fechas futuras
        const updates = [
            {
                game: 'Fortnite',
                startDate: new Date('2024-12-01'),
                endDate: new Date('2025-03-01'),
                targetDate: new Date('2025-03-01'),
                displayStartDate: 'December 1, 2024',
                displayEndDate: 'March 1, 2025'
            },
            {
                game: 'Valorant',
                startDate: new Date('2025-01-10'),
                endDate: new Date('2025-04-15'),
                targetDate: new Date('2025-04-15'),
                displayStartDate: 'January 10, 2025',
                displayEndDate: 'April 15, 2025'
            },
            {
                game: 'League of Legends',
                startDate: new Date('2025-01-01'),
                endDate: new Date('2025-12-31'),
                targetDate: new Date('2025-12-31'),
                displayStartDate: 'January 1, 2025',
                displayEndDate: 'December 31, 2025'
            }
        ];

        for (const update of updates) {
            await Season.findOneAndUpdate(
                { game: update.game },
                update,
                { new: true }
            );
            console.log(`Updated ${update.game} season dates`);
        }

        console.log('\n✅ All season dates updated successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error updating dates:', error);
        process.exit(1);
    }
};

updateSeasonDates();
