import React, { useState, useEffect } from 'react';
import { seasonService } from '../services/api';
import './Dashboard.css';

const Dashboard = ({ onLogout, user }) => {
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingSeason, setEditingSeason] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchSeasons();
    }, []);

    const fetchSeasons = async () => {
        try {
            const data = await seasonService.getAllSeasons();
            setSeasons(data);
        } catch (error) {
            console.error('Error fetching seasons:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (season) => {
        setEditingSeason(season.game);
        setFormData({
            game: season.game,
            seasonName: season.seasonName,
            seasonNumber: season.seasonNumber,
            startDate: new Date(season.startDate).toISOString().split('T')[0],
            endDate: new Date(season.endDate).toISOString().split('T')[0],
            targetDate: new Date(season.targetDate).toISOString().slice(0, 16),
            displayStartDate: season.displayStartDate,
            displayEndDate: season.displayEndDate
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await seasonService.updateSeason(formData);
            await fetchSeasons();
            setEditingSeason(null);
            setFormData({});
        } catch (error) {
            console.error('Error updating season:', error);
            alert('Error updating season');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Season Counter Admin</h1>
                <div className="user-info">
                    <span>Welcome, {user?.username}</span>
                    <button onClick={onLogout} className="btn-logout">Logout</button>
                </div>
            </header>

            <div className="dashboard-content">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="seasons-grid">
                        {seasons.map((season) => (
                            <div key={season._id} className="season-card">
                                {editingSeason === season.game ? (
                                    <form onSubmit={handleSubmit} className="edit-form">
                                        <h3>Edit {season.game}</h3>
                                        <div className="form-row">
                                            <label>
                                                Season Name
                                                <input
                                                    type="text"
                                                    name="seasonName"
                                                    value={formData.seasonName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </label>
                                            <label>
                                                Season Number
                                                <input
                                                    type="number"
                                                    name="seasonNumber"
                                                    value={formData.seasonNumber}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </label>
                                        </div>
                                        <div className="form-row">
                                            <label>
                                                Start Date
                                                <input
                                                    type="date"
                                                    name="startDate"
                                                    value={formData.startDate}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </label>
                                            <label>
                                                End Date
                                                <input
                                                    type="date"
                                                    name="endDate"
                                                    value={formData.endDate}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </label>
                                        </div>
                                        <label>
                                            Target Date & Time
                                            <input
                                                type="datetime-local"
                                                name="targetDate"
                                                value={formData.targetDate}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                        <label>
                                            Display Start Date
                                            <input
                                                type="text"
                                                name="displayStartDate"
                                                value={formData.displayStartDate}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                        <label>
                                            Display End Date
                                            <input
                                                type="text"
                                                name="displayEndDate"
                                                value={formData.displayEndDate}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                        <div className="form-actions">
                                            <button type="submit" className="btn-save">Save</button>
                                            <button type="button" onClick={() => setEditingSeason(null)} className="btn-cancel">Cancel</button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <h3>{season.game}</h3>
                                        <p><strong>Season:</strong> {season.seasonName}</p>
                                        <p><strong>Number:</strong> {season.seasonNumber}</p>
                                        <p><strong>Start:</strong> {season.displayStartDate}</p>
                                        <p><strong>End:</strong> {season.displayEndDate}</p>
                                        <button onClick={() => handleEdit(season)} className="btn-edit">Edit</button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
