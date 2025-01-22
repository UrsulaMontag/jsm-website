import type {Config} from "tailwindcss";

export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'hero': ['"Great Vibes"', 'cursive'],
                'body': ['Roboto', 'sans-serif'],
            },
            colors: {
                "sunset-orange": "#ff914d",
                "sunset-orange-dark": "#e67840",
                "sunset-orange-light": "#ffc2a0",
                "lake-blue": "#276678",
                "neutral-beige": "#f4f1ea",
                // Colors for dark theme
                "dark-bg": "#121212", // Main dark background
                "dark-text": "#e0e0e0", // Light text for dark mode
                "dark-highlight": "#ff914d", // Highlight matching sunset-orange
            },
            backgroundImage: {
                'sunset-gradient': 'linear-gradient(to bottom, #FF7F50, #FFB6C1, #6A5ACD)',
            },
        },
    },
    darkMode: 'class',
    plugins: [],
} satisfies Config;
