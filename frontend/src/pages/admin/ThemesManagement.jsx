import React, { useState, useEffect } from 'react';
import { themeService } from '../../services/themeService';
import { useTheme } from '../../context/ThemeContext';
import ThemeModal from '../../components/ThemeModal';
import '../AdminPage.css';

const ThemesManagement = () => {
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingTheme, setEditingTheme] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });
    const { refreshTheme } = useTheme();

    useEffect(() => {
        fetchThemes();
    }, []);

    const fetchThemes = async () => {
        try {
            setLoading(true);
            const data = await themeService.getAllThemes();
            setThemes(data);
        } catch (error) {
            showMessage('error', 'Error al cargar temas');
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleAdd = () => {
        setEditingTheme(null);
        setShowModal(true);
    };

    const handleEdit = (theme) => {
        setEditingTheme(theme);
        setShowModal(true);
    };

    const handleActivate = async (themeId) => {
        try {
            await themeService.setActiveTheme(themeId);
            showMessage('success', 'Tema activado');
            fetchThemes();
            refreshTheme(); // Apply new theme
        } catch (error) {
            showMessage('error', 'Error al activar tema');
        }
    };

    const handleDelete = async (themeId, themeName) => {
        if (!window.confirm(`¿Eliminar tema ${themeName}?`)) return;

        try {
            await themeService.deleteTheme(themeId);
            showMessage('success', 'Tema eliminado');
            fetchThemes();
        } catch (error) {
            showMessage('error', error.message || 'Error al eliminar tema');
        }
    };

    const handleSave = async (themeData) => {
        try {
            if (editingTheme) {
                await themeService.updateTheme(editingTheme._id, themeData);
                showMessage('success', 'Tema actualizado');
            } else {
                await themeService.createTheme(themeData);
                showMessage('success', 'Tema creado');
            }
            setShowModal(false);
            fetchThemes();
        } catch (error) {
            showMessage('error', 'Error al guardar tema');
        }
    };

    const getSeasonIcon = (season) => {
        const icons = {
            corporate: '💼',
            christmas: '🎄',
            halloween: '�',
            summer: '☀️',
            winter: '❄️',
            autumn: '🍂',
            spring: '�'
        };
        return icons[season] || '🎨';
    };

    if (loading) {
        return <div className="loading-screen"><div className="spinner"></div></div>;
    }

    return (
        <div>
            <div className="admin-header">
                <h1>🎨 Gestión de Temas</h1>
                <p>Personaliza el aspecto del landing por temporada</p>
            </div>

            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="admin-actions">
                <button onClick={handleAdd} className="btn-primary">
                    ➕ Nuevo Tema
                </button>
                <button onClick={fetchThemes} className="btn-secondary">
                    🔄 Actualizar
                </button>
            </div>

            <div className="admin-content">
                <div className="themes-grid">
                    {themes.map((theme) => (
                        <div key={theme._id} className={`theme-card ${theme.isActive ? 'active' : ''}`}>
                            <div className="theme-header">
                                <h3>
                                    {getSeasonIcon(theme.season)} {theme.name}
                                </h3>
                                {theme.isActive && <span className="active-badge">✅ Activo</span>}
                            </div>

                            <div className="theme-colors">
                                <div className="color-swatch" style={{ backgroundColor: theme.colors.primary }}>
                                    <span>Primary</span>
                                </div>
                                <div className="color-swatch" style={{ backgroundColor: theme.colors.secondary }}>
                                    <span>Secondary</span>
                                </div>
                                <div className="color-swatch" style={{ backgroundColor: theme.colors.accent }}>
                                    <span>Accent</span>
                                </div>
                            </div>

                            <div className="theme-actions">
                                {!theme.isActive && (
                                    <button 
                                        onClick={() => handleActivate(theme._id)}
                                        className="btn-icon"
                                    >
                                        ✨ Activar
                                    </button>
                                )}
                                <button 
                                    onClick={() => handleEdit(theme)}
                                    className="btn-icon"
                                >
                                    ✏️ Editar
                                </button>
                                {!theme.isActive && (
                                    <button 
                                        onClick={() => handleDelete(theme._id, theme.name)}
                                        className="btn-icon danger"
                                    >
                                        🗑️
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {themes.length === 0 && (
                    <div className="empty-state">
                        <p>No hay temas registrados</p>
                        <button onClick={handleAdd} className="btn-primary">
                            Crear primer tema
                        </button>
                    </div>
                )}
            </div>

            {showModal && (
                <ThemeModal
                    theme={editingTheme}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default ThemesManagement;
