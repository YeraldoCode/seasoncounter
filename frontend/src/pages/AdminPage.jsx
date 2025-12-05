import React from 'react';
import { Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SeasonsManagement from './admin/SeasonsManagement';
import UsersManagement from './admin/UsersManagement';
import ThemesManagement from './admin/ThemesManagement';
import './AdminPage.css';

const AdminPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>ADMIN PANEL</h2>
                    <p className="admin-user">👤 {user?.username}</p>
                </div>

                <nav className="sidebar-nav">
                    <Link 
                        to="/admin/seasons" 
                        className={location.pathname.includes('/seasons') ? 'nav-link active' : 'nav-link'}
                    >
                        🎮 Temporadas
                    </Link>
                    <Link 
                        to="/admin/themes" 
                        className={location.pathname.includes('/themes') ? 'nav-link active' : 'nav-link'}
                    >
                        🎨 Temas
                    </Link>
                    <Link 
                        to="/admin/users" 
                        className={location.pathname.includes('/users') ? 'nav-link active' : 'nav-link'}
                    >
                        👥 Usuarios
                    </Link>
                </nav>

                <div className="sidebar-footer">
                    <Link to="/" className="nav-link">🏠 Ver Landing</Link>
                    <button onClick={handleLogout} className="btn-logout">
                        🚪 Cerrar Sesión
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <Routes>
                    <Route index element={<Navigate to="/admin/seasons" replace />} />
                    <Route path="seasons" element={<SeasonsManagement />} />
                    <Route path="themes" element={<ThemesManagement />} />
                    <Route path="users" element={<UsersManagement />} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminPage;
