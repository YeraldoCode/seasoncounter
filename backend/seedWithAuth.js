const mongoose = require('mongoose');
const User = require('./models/User');
const Season = require('./models/Season');
const Theme = require('./models/Theme');
require('dotenv').config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/seasoncounter');
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Season.deleteMany({});
        await Theme.deleteMany({});
        console.log('Cleared existing data');

        // Create admin user
        const adminUser = new User({
            username: 'admin',
            email: 'admin@seasoncounter.com',
            password: 'admin123',
            role: 'admin'
        });
        await adminUser.save();
        console.log('Admin user created (email: admin@seasoncounter.com, password: admin123)');

        // Create regular user
        const regularUser = new User({
            username: 'user',
            email: 'user@seasoncounter.com',
            password: 'user123',
            role: 'user'
        });
        await regularUser.save();
        console.log('Regular user created (email: user@seasoncounter.com, password: user123)');

        // Create seasons
        const seasons = [
            {
                game: "Fortnite",
                seasonName: "Chapter 7 Season 1",
                seasonNumber: 7,
                startDate: new Date("2024-12-01"),
                endDate: new Date("2025-03-01"),
                targetDate: new Date("2025-03-01T00:30:00"),
                displayStartDate: "December 1, 2024",
                displayEndDate: "Saturday, March 1, 2025 at 12:30 AM CST"
            },
            {
                game: "COD: Warzone",
                seasonName: "Season 5 Reloaded",
                seasonNumber: 5,
                startDate: new Date("2024-10-01"),
                endDate: new Date("2025-01-15"),
                targetDate: new Date("2025-01-15T10:00:00"),
                displayStartDate: "October 1, 2024",
                displayEndDate: "January 15, 2025"
            },
            {
                game: "PUBG: Battlegrounds",
                seasonName: "Season 31",
                seasonNumber: 31,
                startDate: new Date("2024-09-01"),
                endDate: new Date("2025-02-01"),
                targetDate: new Date("2025-02-01T00:00:00"),
                displayStartDate: "September 1, 2024",
                displayEndDate: "February 1, 2025"
            }
        ];

        await Season.insertMany(seasons);
        console.log('Seasons inserted successfully');

        // Create themes
        const themes = [
            {
                name: 'Winter Theme',
                season: 'winter',
                colors: {
                    primary: '#1e3a5f',
                    secondary: '#2d4a6e',
                    accent: '#6fb1e4',
                    background: '#0a1929',
                    text: '#e3f2fd'
                },
                isActive: true
            },
            {
                name: 'Spring Theme',
                season: 'spring',
                colors: {
                    primary: '#2d5016',
                    secondary: '#3d6b1f',
                    accent: '#81c784',
                    background: '#1b2817',
                    text: '#e8f5e9'
                },
                isActive: false
            },
            {
                name: 'Summer Theme',
                season: 'summer',
                colors: {
                    primary: '#ff6f00',
                    secondary: '#f57c00',
                    accent: '#ffb74d',
                    background: '#1a1200',
                    text: '#fff3e0'
                },
                isActive: false
            },
            {
                name: 'Autumn Theme',
                season: 'autumn',
                colors: {
                    primary: '#5d4037',
                    secondary: '#6d4c41',
                    accent: '#ff8a65',
                    background: '#1c1410',
                    text: '#fbe9e7'
                },
                isActive: false
            }
        ];

        await Theme.insertMany(themes);
        console.log('Themes inserted successfully');

        mongoose.connection.close();
        console.log('\n=== Seed completed successfully ===');
        console.log('Admin credentials: admin@seasoncounter.com / admin123');
        console.log('User credentials: user@seasoncounter.com / user123');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
