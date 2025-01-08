import {defineConfig} from 'cypress';

export default defineConfig({
    e2e: {
        // eslint-disable-next-line
        setupNodeEvents(_on: any, _config: any) {
        },
        baseUrl: 'http://localhost:3000',
    },
    env: {
        CYPRESS_DISABLE_GPU: true,
    },
});