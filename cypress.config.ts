import {defineConfig} from 'cypress';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
        },
        baseUrl: 'http://localhost:3000',
    },
    env: {
        CYPRESS_DISABLE_GPU: true,
    },
});