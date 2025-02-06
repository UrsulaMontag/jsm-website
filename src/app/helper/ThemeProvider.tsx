'use client';

import {useEffect, useState, createContext, useContext, ReactNode, useMemo, useCallback} from 'react';

const ThemeContext = createContext({
    isDarkMode: false, toggleDarkMode: () => {
    }
});

export const ThemeProvider = ({children}: { children: ReactNode; }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setIsDarkMode(storedTheme === 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
        }
    }, []);

    const toggleDarkMode = useCallback(() => {
        setIsDarkMode(prev => {
            const newTheme = !prev;
            // MUST use 'dark'/'light' strings in localStorage
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            return newTheme;
        });
    }, []);

    const contextValue = useMemo(() => ({isDarkMode, toggleDarkMode}), [isDarkMode]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);