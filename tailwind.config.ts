import type {Config} from "tailwindcss";

export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
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

/*extend: {
      colors: {
        // Primary Palette
        'lake-blue': '#264653',
        'sunset-orange': '#F4A261',
        'amber-glow': '#E76F51',
        'sky-blue': '#A8DADC',
        'dusky-purple': '#6C567B',

        // Neutral & Supporting Palette
        'wood-brown': '#8B6A4D',
        'sand-beige': '#D9CBA8',
        'meadow-green': '#52734D',

        // Accent Colors
        'sunset-pink': '#FF847C',
        'shadow-black': '#1C1C1C',
      },
    },*/