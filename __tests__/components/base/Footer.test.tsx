import Footer from "@/app/components/base/Footer";
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import enMessages from '@/../messages/en.json';

jest.mock( 'next-intl', () => ( {
    useTranslations: () => ( key: string ) =>
    {
        const translations: Record<string, string> = {
            'nav.home': 'Home',
            'nav.theHouse': 'The House',
            'nav.gallery': 'Gallery',
            'nav.activities': 'Activities',
            'nav.contact': 'Contact',
            'contact.email': 'Email',
            'contact.phone': 'Phone',
            'contact.address': 'Address',
            'imprint.link': 'Legal Notice & Imprint',
            'imprint.copyright': 'All rights reserved'
        };
        return translations[ key ] || key;
    },
    NextIntlClientProvider: ( { children }: { children: ReactNode; } ) => <>{ children }</>

} ) );

jest.mock( '@/i18n/routing', () =>
{
    const Link = ( { children, href }: { children: ReactNode, href: string; } ) => (
        <a href={ href }>{ children }</a>
    );
    return {
        Link,
        usePathname: () => '/',
        useRouter: () => ( {} ),
        getPathname: () => '/',
        redirect: jest.fn()
    };
} );

describe( 'Footer', () =>
{
    const renderFooter = () =>
    {
        return render(
            <NextIntlClientProvider locale="en" messages={ enMessages }>
                <Footer />
            </NextIntlClientProvider>
        );
    };

    it( 'renders the footer with navigation links', () =>
    {
        renderFooter();
        expect( screen.getByText( 'Home' ) ).toBeInTheDocument();
        expect( screen.getByText( 'The House' ) ).toBeInTheDocument();
        expect( screen.getByText( 'Gallery' ) ).toBeInTheDocument();
        expect( screen.getByText( 'Activities' ) ).toBeInTheDocument();
        expect( screen.getByText( 'Contact' ) ).toBeInTheDocument();
    } );

    it( 'renders the current year in the footer', () =>
    {
        renderFooter();
        const currentYear = new Date().getFullYear();
        const yearElements = screen.getAllByText( ( _content, element ) =>
        {
            return element?.textContent?.includes( currentYear.toString() ) ?? false;
        } );
        expect( yearElements.length ).toBeGreaterThan( 0 );
    } );

    it( 'renders navigation links with correct hrefs', () =>
    {
        renderFooter();
        expect( screen.getByText( 'Home' ).closest( 'a' ) ).toHaveAttribute( 'href', '/' );
        expect( screen.getByText( 'The House' ).closest( 'a' ) ).toHaveAttribute( 'href', '/the-house' );
        expect( screen.getByText( 'Gallery' ).closest( 'a' ) ).toHaveAttribute( 'href', '/gallery' );
        expect( screen.getByText( 'Activities' ).closest( 'a' ) ).toHaveAttribute( 'href', '/activities' );
        expect( screen.getByText( 'Contact' ).closest( 'a' ) ).toHaveAttribute( 'href', '/contact' );
    } );

    it( 'renders the contact information', () =>
    {
        renderFooter();
        expect( screen.getByText( 'Email:' ) ).toBeInTheDocument(); // Check for the label
        expect( screen.getByRole( 'link', { name: 'info@ferienhaus-panoramablick.de' } ) ).toBeInTheDocument(); // Check for the email link
        expect( screen.getByText( 'Phone: +49 123 456 789' ) ).toBeInTheDocument(); // Check for the phone number
        expect( screen.getByText( 'Address: Lütjen-Deile 39, 31515 Wunstorf, Germany' ) ).toBeInTheDocument(); // Check for the address
    } );

    it( 'renders the imprint link', () =>
    {
        renderFooter();
        expect( screen.getByText( 'Legal Notice & Imprint' ).closest( 'a' ) ).toHaveAttribute( 'href', '/contact' );
    } );
} );