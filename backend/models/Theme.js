const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    season: {
        type: String,
        enum: ['spring', 'summer', 'autumn', 'winter', 'default'],
        default: 'default'
    },
    colors: {
        primary: { type: String, default: '#1a202c' },
        secondary: { type: String, default: '#2d3748' },
        accent: { type: String, default: '#48bb78' },
        background: { type: String, default: '#0f1419' },
        text: { type: String, default: '#e2e8f0' }
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Theme', themeSchema);
