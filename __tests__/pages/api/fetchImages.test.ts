import handler from '@/pages/api/fetchImages';
import cloudinary from '@/lib/cloudinaryConfig';
import {NextApiRequest, NextApiResponse} from "next";

jest.mock('@/lib/cloudinaryConfig');

describe('fetchImages API', () => {
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

        (cloudinary.v2.api.resources as jest.Mock).mockResolvedValue({resources: mockImages});

        await handler(req, res as unknown as NextApiResponse);

        expect(res.statusCode).toBe(200);
        expect(res.json).toHaveBeenCalledWith(mockImages);
    });

    it('returns an error on failure', async () => {
        const req = {} as NextApiRequest;
        const res = {
            statusCode: 200,
            json: jest.fn(),
            status: function (code: number) {
                this.statusCode = code;
                return this;
            }
        };

        (cloudinary.v2.api.resources as jest.Mock).mockRejectedValue(new Error('Failed to fetch images'));

        await handler(req, res as unknown as NextApiResponse);

        expect(res.statusCode).toBe(500);
        expect(res.json).toHaveBeenCalledWith({error: 'Failed to fetch images'});
    });
});