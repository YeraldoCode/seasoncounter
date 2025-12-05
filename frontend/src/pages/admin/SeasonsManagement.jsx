import React, { useState, useEffect } from 'react';
import { seasonService } from '../../services/seasonService';
import SeasonModal from '../../components/SeasonModal';
import '../AdminPage.css';

const SeasonsManagement = () => {
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingSeason, setEditingSeason] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchSeasons();
    }, []);

    const fetchSeasons = async () => {
        try {
            setLoading(true);
            const data = await seasonService.getAllSeasons();
            setSeasons(data);
        } catch (error) {
            showMessage('error', 'Error al cargar temporadas');
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleAdd = () => {
        setEditingSeason(null);
        setShowModal(true);
    };

    const handleEdit = (season) => {
        setEditingSeason(season);
        setShowModal(true);
    };

    const handleDelete = async (gameName) => {
        if (!window.confirm(`¿Eliminar temporada de ${gameName}?`)) return;

        try {
            await seasonService.deleteSeason(gameName);
            showMessage('success', 'Temporada eliminada exitosamente');
            fetchSeasons();
        } catch (error) {
            showMessage('error', 'Error al eliminar temporada');
        }
    };

    const handleSave = async (seasonData) => {
        try {
            await seasonService.updateSeason(seasonData);
            showMessage('success', editingSeason ? 'Temporada actualizada' : 'Temporada creada');
            setShowModal(false);
            fetchSeasons();
        } catch (error) {
            showMessage('error', 'Error al guardar temporada');
        }
    };

    if (loading) {
        return <div className="loading-screen"><div className="spinner"></div></div>;
    }

    return (
        <div>
            <div className="admin-header">
                <h1>🎮 Gestión de Temporadas</h1>
                <p>Administra las temporadas de juegos</p>
            </div>

            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="admin-actions">
                <button onClick={handleAdd} className="btn-primary">
                    ➕ Nueva Temporada
                </button>
                <button onClick={fetchSeasons} className="btn-secondary">
                    🔄 Actualizar
                </button>
            </div>

            <div className="admin-content">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Juego</th>
                            <th>Temporada</th>
                            <th>Número</th>
                            <th>Inicio</th>
                            <th>Fin</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seasons.map((season) => (
                            <tr key={season._id}>
                                <td><strong>{season.game}</strong></td>
                                <td>{season.seasonName}</td>
                                <td>#{season.seasonNumber}</td>
                                <td>{season.displayStartDate}</td>
                                <td>{season.displayEndDate}</td>
                                <td>
                                    <div className="table-actions">
                                        <button 
                                            onClick={() => handleEdit(season)}
                                            className="btn-icon"
                                        >
                                            ✏️ Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(season.game)}
                                            className="btn-icon danger"
                                        >
                                            🗑️ Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {seasons.length === 0 && (
                    <div className="empty-state">
                        <p>No hay temporadas registradas</p>
                        <button onClick={handleAdd} className="btn-primary">
                            Agregar primera temporada
                        </button>
                    </div>
                )}
            </div>

            {showModal && (
                <SeasonModal
                    season={editingSeason}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default SeasonsManagement;
