import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {notFound} from 'next/navigation';
import '@/app/[locale]/layout';
import MockServerRootLayout from "../../__mocks__/components/MockServerRootLayout";

jest.mock('next/navigation', () => ({
    notFound: jest.fn(() => {
        throw new Error('Not Found');
    }),
}));

describe('RootLayout', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('renders children when locale is valid', () => {
        const mockMessages = {welcome: 'Welcome'};
        const locale = 'en';

        render(
            <MockServerRootLayout locale={locale} messages={mockMessages}>
                <h1>Hello, World!</h1>
            </MockServerRootLayout>
        );

        expect(screen.getByText('Hello, World!')).toBeInTheDocument();

        const layout = screen.getByTestId('root-layout');
        expect(layout).toHaveAttribute('lang', 'en');
    });

    it('calls notFound when locale is invalid', () => {
        const mockMessages = {};
        const locale = 'fr';

        expect(() => {
            render(
                <MockServerRootLayout locale={locale} messages={mockMessages}>
                    <h1>Should not render</h1>
                </MockServerRootLayout>
            );
        }).toThrow('Not Found');

        expect(notFound).toHaveBeenCalled();
    });
});