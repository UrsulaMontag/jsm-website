import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Highlights from '@/app/components/home/Highlights';
import {NextIntlClientProvider} from 'next-intl';
import messages from '../../../messages/en.json';

describe('Highlights', () => {
    it('renders the highlights section with heading and description', () => {
        render(
            <NextIntlClientProvider locale="en" messages={messages}>
                <Highlights/>
            </NextIntlClientProvider>
        );

        const heading = screen.getByRole('heading');
        expect(heading).toBeInTheDocument();

        const description = screen.getByText(/Discover/i);
        expect(description).toBeInTheDocument();
    });

    it('renders all highlight features with icons and labels', () => {
        render(
            <NextIntlClientProvider locale="en" messages={messages}>
                <Highlights/>
            </NextIntlClientProvider>
        );

        const features = [
            'Boat',
            'Garden',
            'Sauna',
            'Parking',
            'Sunset',
            'Dogs'
        ];

        features.forEach(feature => {
            const label = screen.getByText(new RegExp(feature, 'i'));
            expect(label).toBeInTheDocument();
        });
    });
});