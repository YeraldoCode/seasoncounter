import React, { useState, useEffect } from 'react';
import './SeasonModal.css';

const EventModal = ({ event, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'other',
        startDate: '',
        endDate: '',
        targetDate: '',
        displayStartDate: '',
        displayEndDate: '',
        icon: '📅',
        color: '#48bb78',
        isActive: true
    });

    useEffect(() => {
        if (event) {
            setFormData({
                name: event.name,
                description: event.description,
                category: event.category || 'other',
                startDate: event.startDate?.split('T')[0] || '',
                endDate: event.endDate?.split('T')[0] || '',
                targetDate: event.targetDate?.split('T')[0] || '',
                displayStartDate: event.displayStartDate,
                displayEndDate: event.displayEndDate || '',
                icon: event.icon || '📅',
                color: event.color || '#48bb78',
                isActive: event.isActive !== undefined ? event.isActive : true
            });
        }
    }, [event]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const categoryOptions = [
        { value: 'sports', label: '⚽ Sports' },
        { value: 'holidays', label: '🎄 Holidays' },
        { value: 'entertainment', label: '🎬 Entertainment' },
        { value: 'technology', label: '💻 Technology' },
        { value: 'personal', label: '👤 Personal' },
        { value: 'other', label: '📌 Other' }
    ];

    const iconOptions = [
        '📅', '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🥎', '🏏',
        '🎄', '🎃', '🎉', '💝', '🎆', '🎊', '🎁', '👑',
        '🎬', '🎮', '🎵', '🎪', '🎨', '🎭',
        '💻', '📱', '🚀', '🤖', '⚙️',
        '🌸', '🌞', '🍂', '❄️', '🌙', '⭐'
    ];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{event ? 'Edit Event' : 'New Event'}</h2>
                    <button onClick={onClose} className="btn-close">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-row">
                        <div className="form-group" style={{ flex: 2 }}>
                            <label>Event Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="FIFA World Cup 2026"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Icon</label>
                            <select
                                name="icon"
                                value={formData.icon}
                                onChange={handleChange}
                                style={{ fontSize: '1.5rem' }}
                            >
                                {iconOptions.map(icon => (
                                    <option key={icon} value={icon}>{icon}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="World Cup in North America"
                            rows="2"
                            required
                            style={{ resize: 'vertical', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Category *</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                {categoryOptions.map(cat => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Color</label>
                            <input
                                type="color"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                style={{ height: '40px', cursor: 'pointer' }}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Start Date *</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                            />
                            <small style={{ fontSize: '0.75rem', color: '#666' }}>
                                Optional - for events with duration
                            </small>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Target Date (Countdown) *</label>
                        <input
                            type="date"
                            name="targetDate"
                            value={formData.targetDate}
                            onChange={handleChange}
                            required
                        />
                        <small style={{ fontSize: '0.75rem', color: '#666' }}>
                            Date that the timer counts towards
                        </small>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Start Date (Display) *</label>
                            <input
                                type="text"
                                name="displayStartDate"
                                value={formData.displayStartDate}
                                onChange={handleChange}
                                placeholder="Thursday, June 11, 2026"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>End Date (Display)</label>
                            <input
                                type="text"
                                name="displayEndDate"
                                value={formData.displayEndDate}
                                onChange={handleChange}
                                placeholder="Sunday, July 19, 2026"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                                style={{ width: 'auto' }}
                            />
                            Active Event
                        </label>
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={onClose} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            {event ? 'Update' : 'Create'} Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventModal;
