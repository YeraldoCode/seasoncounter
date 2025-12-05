import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import '../AdminPage.css';

const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (error) {
            showMessage('error', 'Error al cargar usuarios');
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleToggleStatus = async (userId) => {
        try {
            await userService.toggleUserStatus(userId);
            showMessage('success', 'Estado de usuario actualizado');
            fetchUsers();
        } catch (error) {
            showMessage('error', 'Error al actualizar usuario');
        }
    };

    const handleDelete = async (userId, username) => {
        if (!window.confirm(`¿Eliminar usuario ${username}?`)) return;

        try {
            await userService.deleteUser(userId);
            showMessage('success', 'Usuario eliminado');
            fetchUsers();
        } catch (error) {
            showMessage('error', 'Error al eliminar usuario');
        }
    };

    if (loading) {
        return <div className="loading-screen"><div className="spinner"></div></div>;
    }

    return (
        <div>
            <div className="admin-header">
                <h1>👥 Gestión de Usuarios</h1>
                <p>Administra los usuarios del sistema</p>
            </div>

            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="admin-actions">
                <button onClick={fetchUsers} className="btn-secondary">
                    🔄 Actualizar
                </button>
            </div>

            <div className="admin-content">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Creado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td><strong>{user.username}</strong></td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge ${user.role}`}>
                                        {user.role === 'admin' ? '👑 Admin' : '👤 Usuario'}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status ${user.isActive ? 'active' : 'inactive'}`}>
                                        {user.isActive ? '✅ Activo' : '❌ Inactivo'}
                                    </span>
                                </td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div className="table-actions">
                                        <button 
                                            onClick={() => handleToggleStatus(user._id)}
                                            className="btn-icon"
                                        >
                                            {user.isActive ? '🔒 Desactivar' : '🔓 Activar'}
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(user._id, user.username)}
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
            </div>
        </div>
    );
};

export default UsersManagement;
