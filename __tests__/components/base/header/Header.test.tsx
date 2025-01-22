import Header from '@/app/components/base/header/Header';
import {render, screen, fireEvent} from '@testing-library/react';
import {NextIntlClientProvider} from 'next-intl';
import enMessages from '@/../messages/en.json';
import {ReactNode} from "react";

jest.mock('next-intl', () => ({
    useTranslations: () => (key: string) => {
        const translations: Record<string, string> = {
            'logo': 'Logo',
            'nav.home': 'Home',
            'nav.theHouse': 'The House',
            'nav.gallery': 'Gallery',
            'nav.activities': 'Activities',
            'nav.contact': 'Contact',
        };
        return translations[key] || key;
    },
    NextIntlClientProvider: ({children}: { children: ReactNode; }) => <>{children}</>
}));

jest.mock('@/i18n/routing', () => {
    const Link = ({children, href}: { children: ReactNode, href: string; }) => (
        <a href={href}>{children}</a>
    );
    return {
        Link,
        usePathname: () => '/',
        useRouter: () => ({}),
        getPathname: () => '/',
        redirect: jest.fn()
    };
});

jest.mock('@/app/components/base/header/LanguageSwitcher', () => {
    return {
        __esModule: true,
        default: () => <div data-testid="language-switcher">LanguageSwitcher</div>
    };
});

describe('Header', () => {
    const renderHeader = () => {
        return render(
            <NextIntlClientProvider locale="en" messages={enMessages}>
                <Header/>
            </NextIntlClientProvider>
        );
    };

    it('renders the header with logo and navigation links', () => {
        renderHeader();

        expect(screen.getByText('Logo')).toBeInTheDocument();
        expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
        expect(screen.getAllByText('The House').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Gallery').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Activities').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
        const languageSwitchers = screen.getAllByTestId('language-switcher');
        expect(languageSwitchers[0]).toBeInTheDocument();
    });

    it('toggles mobile menu when hamburger icon is clicked', () => {
        renderHeader();

        const menuButton = screen.getByTestId('menu-button');
        fireEvent.click(menuButton);
        const navElements = screen.getAllByRole('navigation');
        const mobileNav = navElements.find(nav => nav.querySelector('ul'));
        if (mobileNav) {
            expect(mobileNav.querySelector('ul')).toHaveClass('block');

            fireEvent.click(menuButton);
            expect(mobileNav.querySelector('ul')).toHaveClass('hidden');
        }
    });

    it('renders navigation links with correct hrefs', () => {
        renderHeader();

        const homeLinks = screen.getAllByText('Home');
        homeLinks.forEach(link => {
            expect(link.closest('a')).toHaveAttribute('href', '/');
        });

        const theHouseLinks = screen.getAllByText('The House');
        theHouseLinks.forEach(link => {
            expect(link.closest('a')).toHaveAttribute('href', '/the-house');
        });

        const galleryLinks = screen.getAllByText('Gallery');
        galleryLinks.forEach(link => {
            expect(link.closest('a')).toHaveAttribute('href', '/gallery');
        });

        const activitiesLinks = screen.getAllByText('Activities');
        activitiesLinks.forEach(link => {
            expect(link.closest('a')).toHaveAttribute('href', '/activities');
        });

        const contactLinks = screen.getAllByText('Contact');
        contactLinks.forEach(link => {
            expect(link.closest('a')).toHaveAttribute('href', '/contact');
        });
    });


    it('renders the language switcher', () => {
        renderHeader();
        const languageSwitchers = screen.getAllByTestId('language-switcher');
        expect(languageSwitchers[0]).toBeInTheDocument();
        expect(languageSwitchers[1]).toBeInTheDocument();
    });

    it('has the correct aria attributes for the menu button', () => {
        renderHeader();
        const menuButton = screen.getByTestId('menu-button');
        expect(menuButton).toHaveAttribute('aria-label', 'Toggle menu');
        expect(menuButton).toHaveAttribute('aria-expanded', 'false'); // Initially closed

        // Open the mobile menu
        fireEvent.click(menuButton);
        expect(menuButton).toHaveAttribute('aria-expanded', 'true'); // Now open
    });
});