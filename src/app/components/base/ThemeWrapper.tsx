'use client';
import {useEffect, ReactNode} from 'react';
import {useTheme} from "@/app/components/base/ThemeProvider";

const ThemeWrapper = ({children}: { children: ReactNode; }) => {
    const {isDarkMode} = useTheme();

    useEffect(() => {
        const html = document.documentElement;
        if (isDarkMode) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className={isDarkMode ? 'dark' : ''} data-testid="theme-wrapper">
            <div
                className={`transition-colors duration-300 ${isDarkMode ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'}`}>
                {children}
            </div>
        </div>
    );
};

export default ThemeWrapper; 