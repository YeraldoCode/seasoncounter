const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['sports', 'holidays', 'entertainment', 'technology', 'personal', 'other'],
        default: 'other'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    targetDate: {
        type: Date,
        required: true
    },
    displayStartDate: {
        type: String,
        required: true
    },
    displayEndDate: {
        type: String,
        required: false
    },
    icon: {
        type: String,
        default: '📅'
    },
    color: {
        type: String,
        default: '#48bb78'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    history: {
        type: String,
        required: false,
        default: ''
    },
    funFacts: {
        type: [String],
        required: false,
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
