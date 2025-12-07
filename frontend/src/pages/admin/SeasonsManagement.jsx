import React, { useState } from 'react';
import { 
    useGetSeasonsQuery, 
    useCreateSeasonMutation,
    useUpdateSeasonMutation,
    useDeleteSeasonMutation 
} from '../../store/apiSlice';
import SeasonModal from '../../components/SeasonModal';
import '../AdminPage.css';

const SeasonsManagement = () => {
    const { data: seasons = [], isLoading, refetch } = useGetSeasonsQuery();
    const [createSeason] = useCreateSeasonMutation();
    const [updateSeason] = useUpdateSeasonMutation();
    const [deleteSeason] = useDeleteSeasonMutation();
    
    const [showModal, setShowModal] = useState(false);
    const [editingSeason, setEditingSeason] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

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
            await deleteSeason(gameName).unwrap();
            showMessage('success', 'Temporada eliminada exitosamente');
        } catch (error) {
            const errorMsg = error.data?.message || 'Error al eliminar temporada';
            showMessage('error', errorMsg);
            console.error('Error deleting season:', error);
            
            if (error.status === 401) {
                showMessage('error', 'Sesión expirada. Por favor, inicia sesión nuevamente.');
            }
        }
    };

    const handleSave = async (seasonData) => {
        try {
            if (editingSeason) {
                // Actualizar temporada existente
                await updateSeason({ game: editingSeason.game, data: seasonData }).unwrap();
                showMessage('success', 'Temporada actualizada exitosamente');
            } else {
                // Crear nueva temporada
                await createSeason(seasonData).unwrap();
                showMessage('success', 'Temporada creada exitosamente');
            }
            setShowModal(false);
        } catch (error) {
            showMessage('error', error.data?.message || 'Error al guardar temporada');
            console.error('Error saving season:', error);
        }
    };

    if (isLoading) {
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
                <button onClick={() => refetch()} className="btn-secondary">
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
