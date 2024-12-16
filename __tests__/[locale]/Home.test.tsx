import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Home from '@/app/[locale]/page';
import {NextIntlClientProvider} from 'next-intl';
import enMessages from '@/../messages/en.json';

jest.mock('next/navigation', () => ({
    notFound: jest.fn(),
    useRouter: jest.fn().mockImplementation(() => ({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
    })),
    usePathname: jest.fn().mockReturnValue('/'),
    useParams: jest.fn().mockReturnValue({}),
}))

describe('Home', () => {

    it('renders the header', () => {
        render(
            <NextIntlClientProvider locale="en" messages={enMessages}>
                <Home/>
            </NextIntlClientProvider>
        );
        const headerElement = screen.getByRole('heading', {level: 1});
        expect(headerElement).toBeInTheDocument();
    });
});