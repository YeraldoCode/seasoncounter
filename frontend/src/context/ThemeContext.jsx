import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(null);
    const [loading, setLoading] = useState(false);

    const applyTheme = (themeData) => {
        // Function disabled to allow dynamic colors per event
    };

    const refreshTheme = async () => {
        // Disabled
    };

    const value = {
        theme,
        loading,
        refreshTheme,
        applyTheme
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
