import '@testing-library/jest-dom';
import {render, screen, act} from '@testing-library/react';
import Home from '@/app/[locale]/page';
import {NextIntlClientProvider} from 'next-intl';
import messages from '../../messages/en.json';

jest.mock('next-cloudinary');

const mockImageData = {
    asset_id: "test-id",
    public_id: "Ferienhaus_Steinhude/lx0ismrhkehom7mkmdtv",
    width: 1920,
    height: 1080,
    folder: "test-folder",
    url: "https://test-url.com/image.jpg",
    alt: "Test Image"
};

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([mockImageData])
    })
) as jest.Mock;

describe('Home', () => {
    beforeEach(() => {
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test_cloud_name';
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME = 'test_preset';
        (global.fetch as jest.Mock).mockClear();
    });

    it('renders the welcome message and fetches images', async () => {
        await act(async () => {
            render(
                <NextIntlClientProvider locale="en" messages={messages}>
                    <Home/>
                </NextIntlClientProvider>
            );
        });

        const welcomeMessage = screen.getByRole('heading', {name: /Welcome to Anchor Point Lütjen-Deile/i});
        expect(welcomeMessage).toBeInTheDocument();

        expect(global.fetch).toHaveBeenCalledWith('api/fetchImages?tag=test_preset');

        const heroImage = await screen.findByTestId('cld-image');
        expect(heroImage).toBeInTheDocument();
        expect(heroImage).toHaveAttribute('src', mockImageData.public_id);
    });

    it('renders the hero section with CTA button', async () => {
        await act(async () => {
            render(
                <NextIntlClientProvider locale="en" messages={messages}>
                    <Home/>
                </NextIntlClientProvider>
            );
        });

        const heroSection = screen.getByRole('main');
        expect(heroSection).toBeInTheDocument();

        const ctaButton = screen.getByTestId('cta-button');
        expect(ctaButton).toBeInTheDocument();
        expect(ctaButton).toHaveTextContent(/More views/i);
    });
});