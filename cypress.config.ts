import {defineConfig} from 'cypress';

export default defineConfig({
    projectId: "zu2j3s",
    e2e: {
        setupNodeEvents(_on: any, _config: any) {

            interface AUTWindow extends Window {
                localStorage: Storage;
                matchMedia: (query: string) => MediaQueryList;
            }

            interface VisitOptions {
                onBeforeLoad?: ((win: AUTWindow) => void) | ((...args: any[]) => void);
            }
        },
        baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720,
    },
    env: {
        CYPRESS_DISABLE_GPU: true,
    },
});