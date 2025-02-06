import {cloudinaryLoader} from '@/lib/cloudinaryLoader';

describe('cloudinaryLoader', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test_cloud_name';
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it('generates correct URL with width and default quality', () => {
        const result = cloudinaryLoader({
            src: 'test/image.jpg',
            width: 800
        });

        expect(result).toBe(
            'https://res.cloudinary.com/test_cloud_name/image/upload/q_75,w_800/test/image.jpg'
        );
    });

    it('generates correct URL with custom quality', () => {
        const result = cloudinaryLoader({
            src: 'test/image.jpg',
            width: 800,
            quality: 90
        });

        expect(result).toBe(
            'https://res.cloudinary.com/test_cloud_name/image/upload/q_90,w_800/test/image.jpg'
        );
    });

    it('handles complex image paths correctly', () => {
        const result = cloudinaryLoader({
            src: 'Ferienhaus_Steinhude/activities/complex_name_123.jpg',
            width: 1200,
            quality: 85
        });

        expect(result).toBe(
            'https://res.cloudinary.com/test_cloud_name/image/upload/q_85,w_1200/Ferienhaus_Steinhude/activities/complex_name_123.jpg'
        );
    });
});