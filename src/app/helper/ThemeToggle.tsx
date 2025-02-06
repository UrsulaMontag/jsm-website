'use client';

import {useTheme} from "@/app/helper/ThemeProvider";
import {useTranslations} from "next-intl";

const ThemeToggle = () => {
    const {isDarkMode, toggleDarkMode} = useTheme();
    const t = useTranslations('ThemeToggle');
    console.log('Current theme:', !isDarkMode ? 'dark' : 'light');

    return (
        <label
            className="flex items-center cursor-pointer text-xs"
            data-testid="theme-toggle"
        >
            <span className="mr-3 text-gray-700 dark:text-gray-300">
                {isDarkMode ? `${t('dark')}` : `${t('light')}`}
            </span>
            <div className="relative">
                <input
                    data-testid="theme-toggle-input"
                    type="checkbox"
                    aria-hidden="true"
                    style={{display: 'none'}}
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div
                    data-testid="theme-toggle-dot"
                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isDarkMode ? 'transform translate-x-full bg-gray-800' : ''
                    }`}
                ></div>
            </div>
        </label>
    );
};

export default ThemeToggle;