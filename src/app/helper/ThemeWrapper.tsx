'use client';

import {useTheme} from "@/app/helper/ThemeProvider";
import {ReactNode} from "react";

const ThemeWrapper = ({children}: { children: ReactNode; }) => {
    const {isDarkMode, toggleDarkMode} = useTheme();

    return (
        <div className={isDarkMode ? 'dark' : ''} data-testid="theme-wrapper">
            <label className="flex items-center cursor-pointer m-4 text-xs">
                <span className="mr-3 text-gray-700">{isDarkMode ? 'Dunkelmodus' : 'Hellmodus'}</span>
                <div className="relative">
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                    />
                    <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                    <div
                        className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isDarkMode ? 'transform translate-x-full bg-gray-800' : ''
                        }`}
                    ></div>
                </div>

            </label>
            <div
                className={`transition-colors duration-300 ${isDarkMode ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'}`}>
                {children}
            </div>
        </div>
    );
};

export default ThemeWrapper; 