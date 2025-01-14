import type {Config} from "tailwindcss";

export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                'white': '#ffffff',
                'light-bg': '#AEC5F2',
                'light-text': '#132742',
                'secondary-light': '#1C8FBD',
                'dark-bg': '#132742',
                'dark-text': '#AEC5F2',
                'secondary-dark': '#4796C4',
                'light': '#CEDAF2',
            },
        },
    },
    darkMode: 'class',
    plugins: [],
} satisfies Config;
