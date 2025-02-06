import '@testing-library/jest-dom';
import {act, render, screen, within} from '@testing-library/react';
import Activities from '@/app/components/home/Activities';
import {NextIntlClientProvider} from 'next-intl';
import messages from '../../../messages/en.json';

const mockImages = [
    {
        public_id: "Ferienhaus_Steinhude/activities/PXL_20230602_095846010_dmtmr0",
        width: 800,
        height: 600,
        alt: "Walking in nature",
    },
    {
        public_id: "Ferienhaus_Steinhude/activities/PXL_20220617_201714361_2_j7o4cx",
        width: 800,
        height: 600,
        alt: "Girl doing yoga on a private jetty",
    },
    {
        public_id: "Ferienhaus_Steinhude/activities/ikorlrobn7obgd6luovn",
        width: 800,
        height: 600,
        alt: "The house own rowing boat in the evening sun",
    }
];

describe('Activities Component', () => {
    const renderComponent = () => {
        render(
            <NextIntlClientProvider locale="en" messages={messages}>
                <Activities images={mockImages}/>
            </NextIntlClientProvider>
        );
    };

    it('renders the activities section with correct heading', () => {
        renderComponent();
        const section = screen.getByRole('region', {name: /Experience Steinhuder Meer/i});
        expect(section).toBeInTheDocument();

        const heading = within(section).getByRole('heading', {
            level: 2,
            name: /Experience Steinhuder Meer/i
        });
        expect(heading).toBeInTheDocument();
    });

    it('renders all activity slides with correct content', async () => {
        await act(async () => {
            renderComponent();
        });

        const activities = [
            {
                title: 'Lakeside Walks',
                description: 'Peaceful walks along the shores of Steinhuder Meer.',
                imageAlt: 'Walking in nature',
            },
            {
                title: 'Yoga',
                description: 'Enjoy yoga on a private jetty.',
                imageAlt: 'Girl doing yoga on a private jetty',
            },
            {
                title: 'Rowing',
                description: 'Take the rowing boat onto the lake.',
                imageAlt: 'The house own rowing boat in the evening sun',
            },
        ];

        const firstActivity = activities[0];
        const firstSlide = screen.getByRole('group', {name: firstActivity.title});

        expect(firstSlide).toBeInTheDocument();
        expect(within(firstSlide).getByRole('heading', {name: firstActivity.title})).toBeInTheDocument();
        expect(within(firstSlide).getByText(firstActivity.description)).toBeInTheDocument();
        expect(within(firstSlide).getByAltText(firstActivity.imageAlt)).toBeInTheDocument();
    });

    it('handles navigation controls correctly', async () => {
        renderComponent();

        const prevButton = screen.getByTestId('prev-arrow');
        const nextButton = screen.getByTestId('next-arrow');

        expect(prevButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();

        const dotsContainer = screen.getByRole('list');
        const dots = within(dotsContainer).getAllByRole('listitem');
        expect(dots).toHaveLength(mockImages.length);
    });

    it('handles empty images array gracefully', async () => {
        render(
            <NextIntlClientProvider locale="en" messages={messages}>
                <Activities images={[]}/>
            </NextIntlClientProvider>
        );

        const section = screen.getByRole('region', {name: /Experience Steinhuder Meer/i});
        expect(section).toBeInTheDocument();

        const slider = screen.queryByRole('button', {name: /previous slide/i});
        expect(slider).not.toBeInTheDocument();
    });

    it('displays correct slide indicators', () => {
        renderComponent();
        const dotsContainer = screen.getByRole('list', {hidden: true});
        expect(dotsContainer).toBeInTheDocument();

        const dots = within(dotsContainer).getAllByRole('listitem', {hidden: true});
        expect(dots).toHaveLength(mockImages.length);

        const firstDot = dots[0];
        expect(firstDot).toHaveClass('slick-active');
    });
});