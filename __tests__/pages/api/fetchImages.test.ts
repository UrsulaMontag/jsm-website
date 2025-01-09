import handler from '@/pages/api/fetchImages';
import {NextApiRequest, NextApiResponse} from "next";

jest.mock('@/lib/cloudinaryConfig', () => ({
    __esModule: true,
    default: {
        v2: {
            api: {
                resources: jest.fn()
            },
            config: jest.fn()
        }
    }
}));

import cloudinary from '@/lib/cloudinaryConfig';

describe('fetchImages API', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {
    });

    beforeEach(() => {
        // Reset environment variables
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test_cloud_name';
        process.env.CLOUDINARY_API_KEY = 'test_api_key';
        process.env.CLOUDINARY_API_SECRET = 'test_secret';

        jest.clearAllMocks();
    });
    afterEach(() => {
        consoleSpy.mockClear();
    });
    afterAll(() => {
        consoleSpy.mockRestore();
    });

    it('returns images on success', async () => {
        const req = {} as NextApiRequest;
        const res = {
            statusCode: 200,
            json: jest.fn(),
            status(code: number) {
                this.statusCode = code;
                return this;
            }
        };

        const mockImages = [
            {
                asset_id: '1',
                public_id: 'Ferienhaus_Steinhude/lx0ismrhkehom7mkmdtv',
                sizes: 'large',
                width: 800,
                height: 600,
                folder: 'Ferienhaus_Steinhude',
                url: 'https://example.com/image.jpg',
                alt: 'Image description',
            },
        ];

        (cloudinary.v2.api.resources as jest.Mock).mockResolvedValueOnce({
            resources: mockImages
        });

        await handler(req, res as unknown as NextApiResponse);

        expect(res.statusCode).toBe(200);
        expect(res.json).toHaveBeenCalledWith(mockImages);
        expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('returns an error on failure', async () => {
        const req = {} as NextApiRequest;
        const res = {
            statusCode: 200,
            json: jest.fn(),
            status(code: number) {
                this.statusCode = code;
                return this;
            }
        };
        const expectedError = new Error('Failed to fetch images');
        (cloudinary.v2.api.resources as jest.Mock).mockRejectedValueOnce(
            expectedError
        );

        await handler(req, res as unknown as NextApiResponse);

        expect(res.statusCode).toBe(500);
        expect(res.json).toHaveBeenCalledWith({error: 'Failed to fetch images'});
        expect(consoleSpy).toHaveBeenCalledWith(expectedError);
    });
});