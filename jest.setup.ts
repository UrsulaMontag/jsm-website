import "@testing-library/jest-dom";
import {loadEnvConfig} from "@next/env";

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
const setupEnv = async () => {

    const projectDir = process.cwd();
    loadEnvConfig(projectDir);

    // Explicitly set environment variables needed for tests
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test_cloud_name';
    process.env.CLOUDINARY_API_KEY = 'test_api_key';
    process.env.CLOUDINARY_API_SECRET = 'test_secret';
    process.env.CLOUDINARY_URL = 'cloudinary://test_api_key:test_secret@test_cloud_name';
}

export default setupEnv;