require('dotenv').config();
const mongoose = require('mongoose');
const Theme = require('./models/Theme');

const thematicThemes = [
    {
        name: 'Corporate Professional',
        season: 'corporate',
        colors: {
            primary: '#1e3a8a',      // Professional corporate blue
            secondary: '#334155',    // Slate gray
            accent: '#3b82f6',       // Bright blue
            background: '#0f172a',   // Deep dark blue
            text: '#f1f5f9'          // Soft white
        },
        isActive: true
    },
    {
        name: 'Christmas Magic',
        season: 'christmas',
        colors: {
            primary: '#166534',      // Dark pine green
            secondary: '#991b1b',    // Deep Christmas red
            accent: '#fbbf24',       // Bright gold
            background: '#14532d',   // Dark forest green
            text: '#fef3c7'          // Light golden cream
        },
        isActive: false
    },
    {
        name: 'Spooky Halloween',
        season: 'halloween',
        colors: {
            primary: '#ea580c',      // Pumpkin orange
            secondary: '#5b21b6',    // Mysterious purple
            accent: '#fb923c',       // Bright orange
            background: '#18181b',   // Deep black
            text: '#fafaf9'          // Ghostly white
        },
        isActive: false
    },
    {
        name: 'Summer Vibes',
        season: 'summer',
        colors: {
            primary: '#fbbf24',      // Radiant sun yellow
            secondary: '#0ea5e9',    // Sky blue
            accent: '#fb7185',       // Coral pink
            background: '#fed7aa',   // Light sandy yellow
            text: '#1e293b'          // Navy blue (for contrast)
        },
        isActive: false
    },
    {
        name: 'Winter Frost',
        season: 'winter',
        colors: {
            primary: '#0369a1',      // Ice blue
            secondary: '#475569',    // Cold gray
            accent: '#7dd3fc',       // Bright ice blue
            background: '#0c4a6e',   // Cold navy blue
            text: '#f0f9ff'          // Very light blue
        },
        isActive: false
    },
    {
        name: 'Autumn Leaves',
        season: 'autumn',
        colors: {
            primary: '#b45309',      // Warm autumn orange
            secondary: '#92400e',    // Earth brown
            accent: '#fb923c',       // Bright orange
            background: '#451a03',   // Dark chocolate brown
            text: '#fef3c7'          // Warm cream
        },
        isActive: false
    },
    {
        name: 'Spring Bloom',
        season: 'spring',
        colors: {
            primary: '#16a34a',      // Vivid spring green
            secondary: '#7c3aed',    // Flower violet
            accent: '#4ade80',       // Bright lime green
            background: '#14532d',   // Dark forest green
            text: '#dcfce7'          // Very light mint green
        },
        isActive: false
    }
];

const seedThemes = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing themes
        await Theme.deleteMany({});
        console.log('Cleared existing themes');

        // Insert new themes
        await Theme.insertMany(thematicThemes);
        console.log('Thematic themes inserted successfully');

        console.log('\n=== Seed completed successfully ===');
        console.log('Available themes:');
        thematicThemes.forEach(theme => {
            console.log(`  - ${theme.name} (${theme.season}) ${theme.isActive ? '✓ ACTIVE' : ''}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error seeding themes:', error);
        process.exit(1);
    }
};

seedThemes();
