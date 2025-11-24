const mongoose = require('mongoose');
const Season = require('./models/Season');
require('dotenv').config();

const seedData = [
    {
        game: "Fortnite",
        seasonName: "Chapter 7 Season 1",
        seasonNumber: 7,
        startDate: new Date("2025-09-06"),
        endDate: new Date("2025-11-29"),
        targetDate: new Date("2025-11-29T00:30:00"),
        displayStartDate: "September 6, 2025",
        displayEndDate: "Saturday, November 29, 2025 at 12:30 AM CST"
    },
    {
        game: "COD: Warzone",
        seasonName: "Season 5 Reloaded",
        seasonNumber: 5,
        startDate: new Date("2025-10-01"),
        endDate: new Date("2025-12-15"),
        targetDate: new Date("2025-12-15T10:00:00"),
        displayStartDate: "October 1, 2025",
        displayEndDate: "December 15, 2025"
    },
    {
        game: "PUBG: Battlegrounds",
        seasonName: "Season 31",
        seasonNumber: 31,
        startDate: new Date("2025-09-01"),
        endDate: new Date("2025-12-01"),
        targetDate: new Date("2025-12-01T00:00:00"),
        displayStartDate: "September 1, 2025",
        displayEndDate: "December 1, 2025"
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
        console.log('Seed data inserted successfully');

        mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
