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
            'nav.about': 'About'
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
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();

        const languageSwitchers = screen.getAllByTestId('language-switcher');
        expect(languageSwitchers[0]).toBeInTheDocument();
        expect(languageSwitchers[1]).toBeInTheDocument();
    });

    it('toggles mobile menu when hamburger icon is clicked', () => {
        renderHeader();

        const menuButton = screen.getByTestId('menu-button');
        const navList = screen.getByRole('list');

        expect(navList).toHaveClass('hidden');
        fireEvent.click(menuButton);
        expect(navList).toHaveClass('block');
        fireEvent.click(menuButton);
        expect(navList).toHaveClass('hidden');
    });

    it('renders navigation links with correct hrefs', () => {
        renderHeader();

        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '/about');
    });
});