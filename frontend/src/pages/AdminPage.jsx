import React from 'react';
import { Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EventsManagement from './admin/EventsManagement';
import UsersManagement from './admin/UsersManagement';
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
                        to="/admin/events"
                        className={location.pathname.includes('/events') ? 'nav-link active' : 'nav-link'}
                    >
                        📅 Events
                    </Link>
                    <Link
                        to="/admin/users"
                        className={location.pathname.includes('/users') ? 'nav-link active' : 'nav-link'}
                    >
                        👥 Users
                    </Link>
                </nav>

                <div className="sidebar-footer">
                    <Link to="/" className="nav-link">🏠 View Landing</Link>
                    <button onClick={handleLogout} className="btn-logout">
                        🚪 Sign Out
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <Routes>
                    <Route index element={<Navigate to="/admin/events" replace />} />
                    <Route path="events" element={<EventsManagement />} />
                    <Route path="users" element={<UsersManagement />} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminPage;
