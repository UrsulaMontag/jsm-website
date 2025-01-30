import '@testing-library/jest-dom';
import {render, screen, act} from '@testing-library/react';
import Home from '@/app/[locale]/page';
import {NextIntlClientProvider} from 'next-intl';
import messages from '../../messages/en.json';


jest.mock('next-cloudinary');

const mockImageData = [
    {
        asset_id: "test-id-1",
        public_id: "Ferienhaus_Steinhude/q5rmzqeq9e5wp1d61tm3",
        width: 1920,
        height: 1080,
        folder: "test-folder",
        url: "https://test-url.com/image1.jpg",
        alt: "Test Image 1"
    },
    {
        asset_id: "test-id-2",
        public_id: "Ferienhaus_Steinhude/aboutHouse1",
        width: 800,
        height: 600,
        folder: "test-folder",
        url: "https://test-url.com/image2.jpg",
        alt: "Test Image 2"
    },
    {
        asset_id: "test-id-3",
        public_id: "Ferienhaus_Steinhude/aboutHouse2",
        width: 800,
        height: 600,
        folder: "test-folder",
        url: "https://test-url.com/image3.jpg",
        alt: "Test Image 3"
    },
    {
        asset_id: "test-id-4",
        public_id: "Ferienhaus_Steinhude/aboutHouse3",
        width: 800,
        height: 600,
        folder: "test-folder",
        url: "https://test-url.com/image4.jpg",
        alt: "Test Image 4"
    }
];

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(mockImageData)
    })
) as jest.Mock;


describe('Home', () => {
    beforeEach(() => {
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test_cloud_name';
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME = 'test_preset';
        (global.fetch as jest.Mock).mockClear();
    });

    it('renders the hero section with CTA button', async () => {
        await act(async () => {
            render(
                <NextIntlClientProvider locale="en" messages={messages}>
                    <Home/>
                </NextIntlClientProvider>
            );
        });

        const heroSection = screen.getByTestId("hero");
        expect(heroSection).toBeInTheDocument();

        const ctaButton = screen.getByTestId('cta-button');
        expect(ctaButton).toBeInTheDocument();
        expect(ctaButton).toHaveTextContent(/More views/i);
    });

    it('renders the about house section with images and CTA button', async () => {
        await act(async () => {
            render(
                <NextIntlClientProvider locale="en" messages={messages}>
                    <Home/>
                </NextIntlClientProvider>
            );
        });

        const aboutHouseHeading = screen.getByRole('heading', {name: /Discover Panoramablick/i});
        expect(aboutHouseHeading).toBeInTheDocument();

        const description = screen.getByLabelText(/Experience peace, privacy, and luxury at Ferienhaus Panoramablick, with amenities like a private jetty, sauna, and secluded garden./i);
        expect(description).toBeInTheDocument();

        const images = screen.getAllByRole('img', {name: /Panoramablick house view/i});
        expect(images).toHaveLength(3);

        const ctaButton = screen.getByRole('link', {name: /Explore the house gallery/i});
        expect(ctaButton).toBeInTheDocument();
    });

    it('renders the highlights section with icons and labels', async () => {
        await act(async () => {
            render(
                <NextIntlClientProvider locale="en" messages={messages}>
                    <Home/>
                </NextIntlClientProvider>
            );
        });

        const highlightsHeading = screen.getByRole('heading', {name: /Why Stay at Panoramablick\?/i});
        expect(highlightsHeading).toBeInTheDocument();

        const features = [
            'Boat',
            'Secluded Garden',
            'Luxury Sauna',
            'Parking',
            'Sunset',
            'Dogs'
        ];

        features.forEach(feature => {
            const label = screen.getByText(new RegExp(feature));
            expect(label).toBeInTheDocument();
        });
    });
});