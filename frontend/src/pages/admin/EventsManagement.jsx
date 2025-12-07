import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useGetEventsQuery,
    useUpdateEventMutation,
    useDeleteEventMutation
} from '../../store/apiSlice';
import EventModal from '../../components/EventModal';
import '../AdminPage.css';

const EventsManagement = () => {
    const navigate = useNavigate();
    const { data: events = [], isLoading } = useGetEventsQuery();
    const [updateEvent] = useUpdateEventMutation();
    const [deleteEvent] = useDeleteEventMutation();

    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Verificar token al montar el componente
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('🔑 Token presente:', token ? 'Sí (' + token.substring(0, 20) + '...)' : 'No');
        if (!token) {
            showMessage('error', 'No active session. Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        }
    }, [navigate]);

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleAdd = () => {
        setEditingEvent(null);
        setShowModal(true);
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setShowModal(true);
    };

    const handleDelete = async (eventName) => {
        if (!window.confirm(`Delete event "${eventName}"?`)) return;

        try {
            await deleteEvent(eventName).unwrap();
            showMessage('success', 'Event deleted successfully');
        } catch (error) {
            console.error('Error deleting event:', error);

            if (error.status === 401) {
                showMessage('error', 'Session expired. Redirecting to login...');
                setTimeout(() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                }, 1500);
            } else {
                const errorMsg = error.data?.message || 'Error deleting event';
                showMessage('error', errorMsg);
            }
        }
    };

    const handleSave = async (eventData) => {
        try {
            await updateEvent(eventData).unwrap();
            showMessage('success', editingEvent ? 'Event updated successfully' : 'Event created successfully');
            setShowModal(false);
        } catch (error) {
            console.error('Error saving event:', error);

            if (error.status === 401) {
                showMessage('error', 'Session expired. Redirecting to login...');
                setTimeout(() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                }, 1500);
            } else {
                showMessage('error', error.data?.message || 'Error al guardar evento');
            }
        }
    };

    const getCategoryBadge = (category) => {
        const categories = {
            sports: { label: 'Sports', color: '#48bb78' },
            holidays: { label: 'Holidays', color: '#e53e3e' },
            entertainment: { label: 'Entertainment', color: '#9f7aea' },
            technology: { label: 'Technology', color: '#3182ce' },
            personal: { label: 'Personal', color: '#ed8936' },
            other: { label: 'Other', color: '#718096' }
        };
        const cat = categories[category] || categories.other;
        return (
            <span style={{
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: cat.color,
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 'bold'
            }}>
                {cat.label}
            </span>
        );
    };

    if (isLoading) {
        return <div className="loading-screen"><div className="spinner"></div></div>;
    }

    return (
        <div>
            <div className="admin-header">
                <h1>📅 Events Management</h1>
                <p>Manage important events</p>
            </div>

            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="admin-actions">
                <button onClick={handleAdd} className="btn-primary">
                    ➕ Add Event
                </button>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Icon</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Start Date</th>
                            <th>Target Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.length === 0 ? (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>
                                    No events found
                                </td>
                            </tr>
                        ) : (
                            events.map((event) => (
                                <tr key={event._id}>
                                    <td style={{ fontSize: '1.5rem' }}>{event.icon}</td>
                                    <td>{event.name}</td>
                                    <td>{event.description}</td>
                                    <td>{getCategoryBadge(event.category)}</td>
                                    <td>{event.displayStartDate}</td>
                                    <td>{new Date(event.targetDate).toLocaleDateString('es-ES')}</td>
                                    <td>
                                        <span className={`status-badge ${event.isActive ? 'active' : 'inactive'}`}>
                                            {event.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleEdit(event)}
                                            className="btn-edit"
                                            title="Edit"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event.name)}
                                            className="btn-delete"
                                            title="Delete"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <EventModal
                    event={editingEvent}
                    onSave={handleSave}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default EventsManagement;
