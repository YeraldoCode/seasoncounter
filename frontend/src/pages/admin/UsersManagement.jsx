import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useGetUsersQuery,
    useToggleUserStatusMutation,
    useDeleteUserMutation
} from '../../store/apiSlice';
import '../AdminPage.css';

const UsersManagement = () => {
    const navigate = useNavigate();
    const { data: users = [], isLoading, error } = useGetUsersQuery();
    const [toggleUserStatus] = useToggleUserStatusMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [message, setMessage] = useState({ type: '', text: '' });

    // Verificar token al montar el componente
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            showMessage('error', 'No active session. Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        }
    }, [navigate]);

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleToggleStatus = async (userId) => {
        try {
            await toggleUserStatus(userId).unwrap();
            showMessage('success', 'User status updated');
        } catch (error) {
            console.error('Error toggling user status:', error);
            if (error.status === 401) {
                showMessage('error', 'Session expired. Redirecting to login...');
                setTimeout(() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                }, 1500);
            } else {
                showMessage('error', 'Error updating user');
            }
        }
    };

    const handleDelete = async (userId, username) => {
        if (!window.confirm(`Delete user ${username}?`)) return;

        try {
            await deleteUser(userId).unwrap();
            showMessage('success', 'User deleted');
        } catch (error) {
            console.error('Error deleting user:', error);
            if (error.status === 401) {
                showMessage('error', 'Session expired. Redirecting to login...');
                setTimeout(() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                }, 1500);
            } else {
                showMessage('error', 'Error deleting user');
            }
        }
    };

    if (isLoading) {
        return <div className="loading-screen"><div className="spinner"></div></div>;
    }

    if (error) {
        return (
            <div className="error-screen">
                <p>Error loading users</p>
                <button onClick={() => navigate('/login')} className="btn-primary">
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="admin-header">
                <h1>👥 Users Management</h1>
                <p>Manage system users</p>
            </div>

            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                                    No registered users
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td><strong>{user.username}</strong></td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`badge ${user.role}`}>
                                            {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status ${user.isActive ? 'active' : 'inactive'}`}>
                                            {user.isActive ? '✅ Active' : '❌ Inactive'}
                                        </span>
                                    </td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleToggleStatus(user._id)}
                                            className="btn-edit"
                                            title={user.isActive ? 'Deactivate' : 'Activate'}
                                        >
                                            {user.isActive ? '🔒' : '🔓'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id, user.username)}
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
        </div>
    );
};

export default UsersManagement;
