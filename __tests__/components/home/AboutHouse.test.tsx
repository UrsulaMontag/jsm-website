import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import AboutHouse from '@/app/components/home/AboutHouse';
import {NextIntlClientProvider} from 'next-intl';
import messages from '../../../messages/en.json';

jest.mock('next-cloudinary');
const mockImages = [
    {
        public_id: "Ferienhaus_Steinhude/aboutHouse1",
        width: 800,
        height: 600,
        url: "https://test-url.com/image1.jpg",
        alt: "Test Image 1"
    },
    {
        public_id: "Ferienhaus_Steinhude/aboutHouse2",
        width: 800,
        height: 600,
        url: "https://test-url.com/image2.jpg",
        alt: "Test Image 2"
    },
    {
        public_id: "Ferienhaus_Steinhude/aboutHouse3",
        width: 800,
        height: 600,
        url: "https://test-url.com/image3.jpg",
        alt: "Test Image 3"
    }
];

describe('AboutHouse', () => {
    beforeEach(() => {
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test_cloud_name';
    });
    it('renders the about house section with images and CTA button', () => {
        render(
            <NextIntlClientProvider locale="en" messages={messages}>
                <AboutHouse images={mockImages}/>
            </NextIntlClientProvider>
        );

        const aboutHouseHeading = screen.getByRole('heading', {name: /Discover Panoramablick/i});
        expect(aboutHouseHeading).toBeInTheDocument();

        const description = screen.getByLabelText(/Experience peace, privacy, and luxury at Ferienhaus Panoramablick, with amenities like a private jetty, sauna, and secluded garden./i);
        expect(description).toBeInTheDocument();

        const images = screen.getAllByRole('img', {name: /View of the house or surroundings at Panoramablick/i});
        expect(images).toHaveLength(mockImages.length);

        const ctaButton = screen.getByRole('link', {name: /Explore the house gallery/i});
        expect(ctaButton).toBeInTheDocument();
    });
});