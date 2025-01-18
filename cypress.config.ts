import {defineConfig} from 'cypress';

export default defineConfig({
    projectId: "zu2j3s",
    e2e: {
        // eslint-disable-next-line
        setupNodeEvents(_on: any, _config: any) {
        },
        baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720,
    },
    env: {
        CYPRESS_DISABLE_GPU: true,
    },
});