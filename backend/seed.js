const mongoose = require('mongoose');
const Season = require('./models/Season');
require('dotenv').config();

// Fechas actuales y futuras para que el contador funcione
const seedData = [
    {
        game: "Fortnite",
        seasonName: "Chapter 6 Season 1",
        seasonNumber: 31,
        startDate: new Date("2024-11-02"),
        endDate: new Date("2025-02-28"),
        targetDate: new Date("2025-02-28T12:00:00"),
        displayStartDate: "November 2, 2024",
        displayEndDate: "February 28, 2025 at 12:00 PM"
    },
    {
        game: "COD: Warzone",
        seasonName: "Season 1",
        seasonNumber: 1,
        startDate: new Date("2024-11-14"),
        endDate: new Date("2025-01-29"),
        targetDate: new Date("2025-01-29T18:00:00"),
        displayStartDate: "November 14, 2024",
        displayEndDate: "January 29, 2025 at 6:00 PM"
    },
    {
        game: "PUBG: Battlegrounds",
        seasonName: "Season 32",
        seasonNumber: 32,
        startDate: new Date("2024-11-13"),
        endDate: new Date("2025-02-05"),
        targetDate: new Date("2025-02-05T09:00:00"),
        displayStartDate: "November 13, 2024",
        displayEndDate: "February 5, 2025 at 9:00 AM"
    },
    {
        game: "Apex Legends",
        seasonName: "Season 23: From the Rift",
        seasonNumber: 23,
        startDate: new Date("2024-11-05"),
        endDate: new Date("2025-01-28"),
        targetDate: new Date("2025-01-28T18:00:00"),
        displayStartDate: "November 5, 2024",
        displayEndDate: "January 28, 2025 at 6:00 PM"
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/seasoncounter');
        console.log('Connected to MongoDB');

        // Clear existing data
        await Season.deleteMany({});
        console.log('Cleared existing seasons');

        // Insert seed data
        await Season.insertMany(seedData);
        console.log('========================');
        console.log('✅ Seed data inserted successfully!');
        console.log('Added games with REAL countdowns:');
        seedData.forEach(s => {
            const daysLeft = Math.ceil((new Date(s.endDate) - new Date()) / (1000 * 60 * 60 * 24));
            console.log(`  - ${s.game}: ${daysLeft} days remaining`);
        });
        console.log('========================');

        mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
