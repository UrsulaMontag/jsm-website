import Hero from "@/app/components/home/Hero";
import {ImageType} from "@/types/cloudinary";
import {render, screen} from "@testing-library/react";
import {NextIntlClientProvider} from "next-intl";
import enMessages from '../../../messages/en.json';

jest.mock('next-cloudinary');

describe('Hero component', () => {
    beforeEach(() => {
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test_cloud_name';
    });

    it('renders the hero image when heroImage prop is provided', () => {
        const heroImage: ImageType = {
            asset_id: "test-id",
            public_id: "test-public-id",
            width: 1920,
            height: 1080,
            sizes: '',
            folder: "test-folder",
            url: "https://test-url.com/image.jpg",
            alt: "Test Image",
        };

        render(
            <NextIntlClientProvider locale="en" messages={enMessages}>
                <Hero heroImage={heroImage}/>
            </NextIntlClientProvider>
        );

        const image = screen.getByTestId('cld-image');
        expect(image).toBeInTheDocument();
    });


});