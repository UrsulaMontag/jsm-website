import Hero from "@/app/components/Hero";
import {ImageType} from "@/types/cloudinary";
import {render, screen} from "@testing-library/react";
import {NextIntlClientProvider} from "next-intl";
import {ReactElement} from "react";
import enMessages from '@/../messages/en.json';


describe("Hero component", () => {
    const mockImage: ImageType = {
        asset_id: '1',
        public_id: 'Ferienhaus_Steinhude/lx0ismrhkehom7mkmdtv',
        sizes: 'large',
        width: 800,
        height: 600,
        folder: 'Ferienhaus_Steinhude',
        url: 'https://example.com/image.jpg',
        alt: 'Hero image',
    };
    const renderWithIntl = (ui: ReactElement) => {
        return render(
            <NextIntlClientProvider locale="en" messages={enMessages}>
                {ui}
            </NextIntlClientProvider>
        );
    };

    it('renders the hero image when heroImage prop is provided', () => {
        renderWithIntl(<Hero heroImage={mockImage}/>);
        expect(screen.getByAltText('Hero image')).toBeInTheDocument();
    });

    it('does not render the hero image when heroImage prop is not provided', () => {
        renderWithIntl(<Hero heroImage={undefined}/>);
        expect(screen.queryByAltText('Hero image')).not.toBeInTheDocument();
    });

    it('renders the welcome message', () => {
        renderWithIntl(<Hero heroImage={mockImage}/>);
        expect(screen.getByText('Welcome to Anchor Point Lütjen-Deile')).toBeInTheDocument();
    });

    it('renders cta-button to gallery', () => {
        renderWithIntl(<Hero heroImage={mockImage}/>);
        expect(screen.getByText('More views')).toBeInTheDocument();
    });
});