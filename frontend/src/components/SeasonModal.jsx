import React, { useState, useEffect } from 'react';
import './SeasonModal.css';

const SeasonModal = ({ season, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        game: '',
        seasonName: '',
        seasonNumber: 1,
        startDate: '',
        endDate: '',
        targetDate: '',
        displayStartDate: '',
        displayEndDate: ''
    });

    useEffect(() => {
        if (season) {
            setFormData({
                game: season.game,
                seasonName: season.seasonName,
                seasonNumber: season.seasonNumber,
                startDate: season.startDate?.split('T')[0] || '',
                endDate: season.endDate?.split('T')[0] || '',
                targetDate: season.targetDate?.split('T')[0] || '',
                displayStartDate: season.displayStartDate,
                displayEndDate: season.displayEndDate
            });
        }
    }, [season]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'seasonNumber' ? parseInt(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{season ? 'Editar Temporada' : 'Nueva Temporada'}</h2>
                    <button onClick={onClose} className="btn-close">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Juego *</label>
                            <input
                                type="text"
                                name="game"
                                value={formData.game}
                                onChange={handleChange}
                                placeholder="Fortnite"
                                required
                                disabled={!!season}
                            />
                        </div>

                        <div className="form-group">
                            <label>Número de Temporada *</label>
                            <input
                                type="number"
                                name="seasonNumber"
                                value={formData.seasonNumber}
                                onChange={handleChange}
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Nombre de Temporada *</label>
                        <input
                            type="text"
                            name="seasonName"
                            value={formData.seasonName}
                            onChange={handleChange}
                            placeholder="Chapter 7 Season 1"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Fecha de Inicio *</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Fecha de Fin *</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Fecha Objetivo (Countdown)</label>
                        <input
                            type="date"
                            name="targetDate"
                            value={formData.targetDate}
                            onChange={handleChange}
                        />
                        <small>Si no se especifica, se usará la fecha de fin</small>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Fecha de Inicio (Display) *</label>
                            <input
                                type="text"
                                name="displayStartDate"
                                value={formData.displayStartDate}
                                onChange={handleChange}
                                placeholder="December 1, 2024"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Fecha de Fin (Display) *</label>
                            <input
                                type="text"
                                name="displayEndDate"
                                value={formData.displayEndDate}
                                onChange={handleChange}
                                placeholder="March 1, 2025"
                                required
                            />
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-secondary">
                            Cancelar
                        </button>
                        <button type="submit" className="btn-primary">
                            {season ? 'Update' : 'Create'} Season
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SeasonModal;
