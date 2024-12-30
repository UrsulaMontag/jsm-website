'use client';

import { useEffect, useState, createContext, useContext, ReactNode } from 'react';

const ThemeContext = createContext( { isDarkMode: false, toggleDarkMode: () => { } } );

export const ThemeProvider = ( { children }: { children: ReactNode; } ) =>
{
    const [ isDarkMode, setIsDarkMode ] = useState( false );

    useEffect( () =>
    {
        const prefersDark = window.matchMedia( '(prefers-color-scheme: dark)' ).matches;
        setIsDarkMode( prefersDark );
    }, [] );

    const toggleDarkMode = () =>
    {
        setIsDarkMode( prev => !prev );
    };

    return (
        <ThemeContext.Provider value={ { isDarkMode, toggleDarkMode } }>
            { children }
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext( ThemeContext );