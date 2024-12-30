import '@testing-library/jest-dom';
import {render, screen, act, waitFor} from '@testing-library/react';
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
}));
const mockFetchResponse = {
    ok: true,
    status: 200,
    json: () => Promise.resolve([
        {
            public_id: 'Ferienhaus_Steinhude/lx0ismrhkehom7mkmdtv',
            url: 'https://example.com/image.jpg',
            width: 1920,
            height: 1080,
            alt: 'Hero Image'
        },
    ]),
    headers: new Headers(),
    redirected: false,
    statusText: 'OK',
    type: 'basic',
    url: '',
    clone: jest.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
    bytes: jest.fn(),
};

global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse as Response));

describe('Home', () => {

    it('renders the header', async () => {
        await act(async () => {
            render(
                <NextIntlClientProvider locale="en" messages={enMessages}>
                    <Home/>
                </NextIntlClientProvider>
            );
        });
        await waitFor(() => {
            const headerElement = screen.getByRole('banner');
            expect(headerElement).toBeInTheDocument();
        });
    });
    it('renders the hero image', async () => {
        await act(async () => {
            render(
                <NextIntlClientProvider locale="en" messages={enMessages}>
                    <Home/>
                </NextIntlClientProvider>
            );
        });

        await waitFor(() => {
            const heroImage = screen.getByAltText('Hero Image');
            expect(heroImage).toBeInTheDocument();
        });
    });

});