import React, { useState, useEffect } from 'react';
import './SeasonModal.css';

const ThemeModal = ({ theme, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        season: 'corporate',
        colors: {
            primary: '#1a202c',
            secondary: '#2d3748',
            accent: '#48bb78',
            background: '#0f1419',
            text: '#e2e8f0'
        }
    });

    useEffect(() => {
        if (theme) {
            setFormData({
                name: theme.name,
                season: theme.season,
                colors: theme.colors
            });
        }
    }, [theme]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleColorChange = (colorName, value) => {
        setFormData(prev => ({
            ...prev,
            colors: {
                ...prev.colors,
                [colorName]: value
            }
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
                    <h2>{theme ? 'Editar Tema' : 'Nuevo Tema'}</h2>
                    <button onClick={onClose} className="btn-close">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nombre del Tema *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Winter Theme"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Temporada *</label>
                            <select
                                name="season"
                                value={formData.season}
                                onChange={handleChange}
                                required
                            >
                                <option value="corporate">💼 Corporativo</option>
                                <option value="christmas">🎄 Navidad</option>
                                <option value="halloween">� Halloween</option>
                                <option value="summer">☀️ Verano</option>
                                <option value="winter">❄️ Invierno</option>
                                <option value="autumn">🍂 Otoño</option>
                                <option value="spring">🌸 Primavera</option>
                            </select>
                        </div>
                    </div>

                    <h3 style={{ color: 'var(--color-text)', marginTop: '20px', marginBottom: '16px' }}>
                        Colores del Tema
                    </h3>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Color Primario</label>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <input
                                    type="color"
                                    value={formData.colors.primary}
                                    onChange={(e) => handleColorChange('primary', e.target.value)}
                                    style={{ width: '60px', height: '40px' }}
                                />
                                <input
                                    type="text"
                                    value={formData.colors.primary}
                                    onChange={(e) => handleColorChange('primary', e.target.value)}
                                    placeholder="#1a202c"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Color Secundario</label>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <input
                                    type="color"
                                    value={formData.colors.secondary}
                                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                                    style={{ width: '60px', height: '40px' }}
                                />
                                <input
                                    type="text"
                                    value={formData.colors.secondary}
                                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                                    placeholder="#2d3748"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Color de Acento</label>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <input
                                    type="color"
                                    value={formData.colors.accent}
                                    onChange={(e) => handleColorChange('accent', e.target.value)}
                                    style={{ width: '60px', height: '40px' }}
                                />
                                <input
                                    type="text"
                                    value={formData.colors.accent}
                                    onChange={(e) => handleColorChange('accent', e.target.value)}
                                    placeholder="#48bb78"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Color de Fondo</label>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <input
                                    type="color"
                                    value={formData.colors.background}
                                    onChange={(e) => handleColorChange('background', e.target.value)}
                                    style={{ width: '60px', height: '40px' }}
                                />
                                <input
                                    type="text"
                                    value={formData.colors.background}
                                    onChange={(e) => handleColorChange('background', e.target.value)}
                                    placeholder="#0f1419"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Color de Texto</label>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <input
                                type="color"
                                value={formData.colors.text}
                                onChange={(e) => handleColorChange('text', e.target.value)}
                                style={{ width: '60px', height: '40px' }}
                            />
                            <input
                                type="text"
                                value={formData.colors.text}
                                onChange={(e) => handleColorChange('text', e.target.value)}
                                placeholder="#e2e8f0"
                            />
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-secondary">
                            Cancelar
                        </button>
                        <button type="submit" className="btn-primary">
                            {theme ? 'Update' : 'Create'} Theme
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ThemeModal;
