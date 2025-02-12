import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from "@/app/[locale]/not-found";
import {NextIntlClientProvider} from "next-intl";

// Mock translations for testing
const messages = {
    ErrorPage: {
        title: 'Page Not Found',
        description: 'The page you are looking for does not exist.',
        comingSoon: 'This page will be available soon.',
        backToHome: 'Go back to the homepage',
    }
};

describe('Custom404', () => {
    it('renders the title, description, and "back to home" link', () => {
        render(
            <NextIntlClientProvider locale={'en'} messages={messages}>
                <NotFound/>
            </NextIntlClientProvider>
        );

        expect(screen.getByText('Page Not Found')).toBeInTheDocument();

        expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();

        expect(screen.getByText('This page will be available soon.')).toBeInTheDocument();

        const backToHomeLink = screen.getByText('Go back to the homepage');
        expect(backToHomeLink).toBeInTheDocument();
        expect(backToHomeLink).toHaveAttribute('href', '/en');
    });
});
