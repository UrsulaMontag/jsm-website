import {defineConfig} from 'cypress';

export default defineConfig({
    e2e: {
        // eslint-disable-next-line
        setupNodeEvents(_on: any, _config: any) {
        },
        baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
    },
    env: {
        CYPRESS_DISABLE_GPU: true,
    },
});