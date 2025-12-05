import React, { createContext, useState, useContext, useEffect } from 'react';
import { themeService } from '../services/themeService';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActiveTheme();
    }, []);

    const fetchActiveTheme = async () => {
        try {
            const activeTheme = await themeService.getActiveTheme();
            setTheme(activeTheme);
            applyTheme(activeTheme);
        } catch (error) {
            console.error('Error fetching theme:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyTheme = (themeData) => {
        if (themeData && themeData.colors) {
            const root = document.documentElement;
            root.style.setProperty('--color-primary', themeData.colors.primary);
            root.style.setProperty('--color-secondary', themeData.colors.secondary);
            root.style.setProperty('--color-accent', themeData.colors.accent);
            root.style.setProperty('--color-background', themeData.colors.background);
            root.style.setProperty('--color-text', themeData.colors.text);
        }
    };

    const refreshTheme = async () => {
        await fetchActiveTheme();
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
