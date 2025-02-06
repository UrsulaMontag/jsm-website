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
                "dark-bg": "#121212",
                "dark-text": "#e0e0e0",
                "dark-highlight": "#ff914d",
                'amber-glow': '#E76F51',
                'dusky-purple': '#6C567B',
                'wood-brown': '#8B6A4D',
                'sand-beige': '#D9CBA8',
                'meadow-green': '#52734D',

                'sunset-pink': '#FF847C',
                'shadow-black': '#1C1C1C',

                'bright-orange': '#FF6F20',
                'deep-pink': '#FF3D5B',
            },
            backgroundImage: {
                'sunset-gradient': 'linear-gradient(to bottom right, theme("colors.sunset-orange-light"), theme("colors.sunset-orange"), theme("colors.sunset-orange-dark"))',
                'sunset-gradient-dark': 'linear-gradient(to bottom right, theme("colors.shadow-black"), theme("colors.amber-glow"), theme("colors.sunset-orange"))',
                'section-light': 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.95))',
                'section-dark': 'linear-gradient(to bottom right, rgba(18,18,18,0.9), rgba(18,18,18,0.95))',
            },
            animation: {
                'gradient-x': 'gradient-x 15s ease infinite',
                'gradient-y': 'gradient-y 15s ease infinite',
                'gradient-xy': 'gradient-xy 15s ease infinite',
            },
            keyframes: {
                'gradient-y': {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': 'center top'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'center center'
                    }
                },
            },
        },
    },
    darkMode: 'class',
    plugins: [],
} satisfies Config;
