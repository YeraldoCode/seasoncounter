const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema({
    game: {
        type: String,
        required: true,
        unique: true
    },
    seasonName: {
        type: String,
        required: true
    },
    seasonNumber: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    targetDate: {
        type: Date,
        required: true
    },
    displayStartDate: {
        type: String, // For formatted strings like "September 6, 2025"
        required: true
    },
    displayEndDate: {
        type: String, // For formatted strings like "Saturday, November 29, 2025 at 12:30 AM CST"
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Season', seasonSchema);
