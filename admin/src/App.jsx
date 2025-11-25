import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { authService } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = authService.getToken();
    const currentUser = authService.getCurrentUser();
    if (token && currentUser) {
      setIsAuthenticated(true);
      setUser(currentUser);
    }
  }, []);

  const handleLogin = () => {
    const currentUser = authService.getCurrentUser();
    setIsAuthenticated(true);
    setUser(currentUser);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} user={user} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
