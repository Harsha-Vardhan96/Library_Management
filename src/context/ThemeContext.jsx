/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [accentColor, setAccentColor] = useState(() => localStorage.getItem('accentColor') || '#FF6D00');
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem('isDark');
        return stored !== null ? stored === 'true' : true; // default dark
    });

    // Sync accent CSS variable
    useEffect(() => {
        localStorage.setItem('accentColor', accentColor);
        document.documentElement.style.setProperty('--accent-color', accentColor);
    }, [accentColor]);

    // Sync dark/light class on <html>
    useEffect(() => {
        localStorage.setItem('isDark', isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    return (
        <ThemeContext.Provider value={{ accentColor, setAccentColor, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
