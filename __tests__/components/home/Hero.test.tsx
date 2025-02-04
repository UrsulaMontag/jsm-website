import Hero from "@/app/components/home/Hero";
import {render, screen} from "@testing-library/react";
import {NextIntlClientProvider} from "next-intl";
import enMessages from '../../../messages/en.json';

jest.mock('next-cloudinary');

describe('Hero component', () => {

    it('renders the hero image when heroImage prop is provided', () => {
        render(
            <NextIntlClientProvider locale="en" messages={enMessages}>
                <Hero/>
            </NextIntlClientProvider>
        );

        const image = screen.getByTestId('hero-image');
        expect(image).toBeInTheDocument();
    });


});