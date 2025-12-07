const Event = require('../models/Event');

// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({ isActive: true }).sort({ targetDate: 1 });
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
};

// Get event by name
const getEventByName = async (req, res) => {
    try {
        const eventName = req.params.name;
        const event = await Event.findOne({ 
            name: { $regex: new RegExp(`^${eventName}$`, 'i') }
        });
        
        if (!event) {
            return res.status(404).json({ 
                message: `Event not found: ${eventName}` 
            });
        }
        
        res.json(event);
    } catch (error) {
        console.error(`Error fetching event ${req.params.name}:`, error);
        res.status(500).json({ message: 'Error fetching event', error: error.message });
    }
};

// Create or update event
const updateEvent = async (req, res) => {
    try {
        const { 
            name, 
            description, 
            category, 
            startDate, 
            endDate, 
            targetDate, 
            displayStartDate, 
            displayEndDate, 
            icon, 
            color 
        } = req.body;

        // Validation
        if (!name || !description || !targetDate || !displayStartDate) {
            return res.status(400).json({ 
                message: 'Name, description, targetDate, and displayStartDate are required' 
            });
        }

        let event = await Event.findOne({ 
            name: { $regex: new RegExp(`^${name}$`, 'i') }
        });

        if (event) {
            // Update existing event
            event.description = description;
            event.category = category || event.category;
            event.startDate = startDate || event.startDate;
            event.endDate = endDate;
            event.targetDate = targetDate;
            event.displayStartDate = displayStartDate;
            event.displayEndDate = displayEndDate;
            event.icon = icon || event.icon;
            event.color = color || event.color;
            
            await event.save();
            res.json({ message: 'Event updated successfully', event });
        } else {
            // Create new event
            event = new Event({
                name,
                description,
                category: category || 'other',
                startDate: startDate || targetDate,
                endDate,
                targetDate,
                displayStartDate,
                displayEndDate,
                icon: icon || '📅',
                color: color || '#48bb78'
            });
            
            await event.save();
            res.status(201).json({ message: 'Event created successfully', event });
        }
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).json({ message: 'Error saving event', error: error.message });
    }
};

// Delete event
const deleteEvent = async (req, res) => {
    try {
        const eventName = req.params.name;
        const event = await Event.findOneAndDelete({ 
            name: { $regex: new RegExp(`^${eventName}$`, 'i') }
        });
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
};

// Get active events (upcoming)
const getActiveEvents = async (req, res) => {
    try {
        const now = new Date();
        const events = await Event.find({
            isActive: true,
            targetDate: { $gte: now }
        }).sort({ targetDate: 1 });
        res.json(events);
    } catch (error) {
        console.error('Error fetching active events:', error);
        res.status(500).json({ message: 'Error fetching active events', error: error.message });
    }
};

module.exports = {
    getEvents,
    getEventByName,
    updateEvent,
    deleteEvent,
    getActiveEvents
};
