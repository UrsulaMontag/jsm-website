import type { Config } from "tailwindcss";

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
                'light-text': '#261514',
                'secondary-light': '#594432',
                'dark-bg': '#261514',
                'dark-text': '#AEC5F2',
                'secondary-dark': '#8C715A',
                'light': '#CEDAF2',
            },
        },
    },
    darkMode: 'class',
    plugins: [],
} satisfies Config;
