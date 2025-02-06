import {fireEvent, render, screen, within} from '@testing-library/react';
import LocationHighlight from '@/app/components/home/LocationHighlight';
import {ImageType} from '@/types/cloudinary';
import {NextIntlClientProvider} from 'next-intl';
import messages from '../../../messages/en.json';


jest.mock('@/lib/cloudinaryLoader', () => ({
    cloudinaryLoader: jest.fn(({src}) => `https://res.cloudinary.com/mock/${src}`),
}));

jest.mock('@headlessui/react', () => {
    return {
        // eslint-disable-next-line
        Dialog: ({children, open}: any) => (
            <div role="dialog" data-testid="dialog" aria-modal="true">
                {open && children}
            </div>
        ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        DialogBackdrop: ({children, className}: any) => (
            <div data-testid="dialog-backdrop" className={className}>
                {children}
            </div>
        ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        DialogPanel: ({children, className}: any) => (
            <div data-testid="dialog-content" className={className}>
                {children}
            </div>
        ),
    };
});

const mockImages: ImageType[] = [
    {public_id: 'location/image1', alt: 'Image 1'},
    {public_id: 'location/image2', alt: 'Image 2'},
    {public_id: 'location/image3', alt: 'Image 3'},
];

describe('LocationHighlight Component', () => {
    const renderComponent = () => {
        render(
            <NextIntlClientProvider locale="en" messages={messages}>
                <LocationHighlight images={mockImages}/>
            </NextIntlClientProvider>
        );
    };
    it('renders the component with all images', () => {
        renderComponent();

        expect(screen.getByAltText('Image 1')).toBeInTheDocument();

        expect(screen.getByAltText('Image 2')).toBeInTheDocument();
        expect(screen.getByAltText('Image 3')).toBeInTheDocument();
    });

    it('opens lightbox when clicking an image', () => {
        renderComponent();

        fireEvent.click(screen.getByAltText('Image 1'));
        expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    });

    it('navigates between images using arrows', async () => {
        renderComponent();

        fireEvent.click(screen.getByAltText('Image 1'));

        const nextButton = screen.getByLabelText('Next image');
        fireEvent.click(nextButton);

        const dialogContent = screen.getByTestId('dialog-content');
        const image2InLightbox = within(dialogContent).getByAltText('Image 2');
        expect(image2InLightbox).toBeInTheDocument();

        const prevButton = screen.getByLabelText('Previous image');
        fireEvent.click(prevButton);

        const image1InLightbox = within(dialogContent).getByAltText('Image 1');
        expect(image1InLightbox).toBeInTheDocument();
    });

    it('shows correct image counter', () => {
        renderComponent();

        fireEvent.click(screen.getByAltText('Image 2'));
        expect(screen.getByText('2 / 3')).toBeInTheDocument();
    });

    it('handles keyboard navigation', () => {
        renderComponent();
        fireEvent.click(screen.getByAltText('Image 1'));

        fireEvent.keyDown(document, {key: 'ArrowRight'});
        const dialogContent = screen.getByTestId('dialog-content');
        const image2InLightbox = within(dialogContent).getByAltText('Image 2');
        expect(image2InLightbox).toBeInTheDocument();

        fireEvent.keyDown(document, {key: 'ArrowLeft'});
        const image1InLightbox = within(dialogContent).getByAltText('Image 1');
        expect(image1InLightbox).toBeInTheDocument();

        fireEvent.keyDown(document, {key: 'Escape'});
        expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
    });

    it('closes when clicking close button', () => {
        renderComponent();

        fireEvent.click(screen.getByAltText('Image 1'));
        fireEvent.click(screen.getByLabelText('Close dialog'));
        expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
    });

    it('handles empty images array gracefully', () => {
        render(
            <NextIntlClientProvider locale="en" messages={messages}>
                <LocationHighlight images={[]}/>
            </NextIntlClientProvider>
        );
        expect(screen.getByAltText('Lakeside view')).toBeInTheDocument();
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(1);
    });


    it('does not show navigation arrows when only one image exists', () => {
        render(
            <NextIntlClientProvider locale="en" messages={messages}>
                <LocationHighlight images={[mockImages[0]]}/>
            </NextIntlClientProvider>
        );
        fireEvent.click(screen.getByAltText('Image 1'));

        expect(screen.queryByLabelText('HomePage.location.previous')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('HomePage.location.next')).not.toBeInTheDocument();
    });

    it('updates counter when navigating through images', () => {
        renderComponent();
        fireEvent.click(screen.getByAltText('Image 1'));

        const counter = screen.getByText('1 / 3');
        fireEvent.click(screen.getByLabelText('Next image'));
        expect(counter).toHaveTextContent('2 / 3');
    });

    it('wraps around when navigating past first/last image', () => {
        renderComponent();
        fireEvent.click(screen.getByAltText('Image 1'));

        fireEvent.click(screen.getByLabelText('Previous image'));
        const dialogContent = screen.getByTestId('dialog-content');
        const lastImageInLightbox = within(dialogContent).getByAltText('Image 3');
        expect(lastImageInLightbox).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText('Next image'));
        const firstImageInLightbox = within(dialogContent).getByAltText('Image 1');
        expect(firstImageInLightbox).toBeInTheDocument();
    });
});