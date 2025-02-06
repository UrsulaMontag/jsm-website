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

    it('renders the location highlight section with images', async () => {
        await act(async () => {
            render(
                <NextIntlClientProvider locale="en" messages={messages}>
                    <Home/>
                </NextIntlClientProvider>
            );
        });

        const locationHeading = screen.getByRole('heading', {name: /Direct Lakeside Living/i});
        expect(locationHeading).toBeInTheDocument();

        const description = screen.getByText(/Experience the unique connection to nature/i);
        expect(description).toBeInTheDocument();

        const locationImages = screen.getAllByRole('img')
            .filter(img => img.getAttribute('src')?.includes('why_pbsh'));
        expect(locationImages.length).toBeGreaterThan(0);

        const features = [
            'Panoramic Views',
            'Private Water Access'
        ];
        features.forEach(feature => {
            const featureHeading = screen.getByRole('heading', {name: new RegExp(feature, 'i')});
            expect(featureHeading).toBeInTheDocument();
        });
    });

    it('renders the activities section with slider', async () => {
        await act(async () => {
            render(
                <NextIntlClientProvider locale="en" messages={messages}>
                    <Home/>
                </NextIntlClientProvider>
            );
        });

        const activitiesHeading = screen.getByRole('heading', {name: /Experience Steinhuder Meer/i, level: 2});
        expect(activitiesHeading).toBeInTheDocument();

        const prevButton = screen.getByTestId('prev-arrow');
        const nextButton = screen.getByTestId('next-arrow');
        expect(prevButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();

        const activityImages = screen.getAllByRole('img')
            .filter(img => img.getAttribute('src')?.includes('activities'));
        expect(activityImages.length).toBeGreaterThan(0);
    });

    it('renders all main sections in correct order', async () => {
        await act(async () => {
            render(
                <NextIntlClientProvider locale="en" messages={messages}>
                    <Home/>
                </NextIntlClientProvider>
            );
        });

        const main = document.body;
        const sections = [
            screen.getByTestId('hero'),
            screen.getByRole('region', {name: /Direct Lakeside Living/i}),
            screen.getByRole('region', {name: /Discover Panoramablick/i}),
            screen.getByRole('region', {name: /Why Stay at Panoramablick/i}),
            screen.getByRole('region', {name: /Experience Steinhuder Meer/i})
        ];

        sections.forEach(section => {
            expect(section).toBeInTheDocument();
        });

        sections.reduce((previousSection, currentSection) => {
            expect(main.compareDocumentPosition(currentSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
            return currentSection;
        });
    });
});