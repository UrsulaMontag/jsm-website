import '@testing-library/jest-dom';
import {render, screen, act} from '@testing-library/react';
import Home from '@/app/[locale]/page';
import {NextIntlClientProvider} from 'next-intl';
import messages from '../../messages/en.json';


jest.mock('next/image', () => ({
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: (props: any) => {
        const {src, alt, ...rest} = props;
        // eslint-disable-next-line
        return <img src={src} alt={alt} {...rest} />;
    }
}));

describe('Home', () => {
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