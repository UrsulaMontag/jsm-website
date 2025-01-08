import Footer from "@/app/components/base/Footer";
import {render, screen} from "@testing-library/react";
import {ReactNode} from "react";
import {NextIntlClientProvider} from "next-intl";
import enMessages from '@/../messages/en.json';

jest.mock('next-intl', () => ({
    useTranslations: () => (key: string) => {
        const translations: Record<string, string> = {
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.contact': 'Contact',
            'nav.imprint': 'Imprint',
            'copyright': 'All rights reserved'
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

describe('Footer', () => {
    const renderFooter = () => {
        return render(
            <NextIntlClientProvider locale="en" messages={enMessages}>
                <Footer/>
            </NextIntlClientProvider>
        )
    };
    it('renders the footer with navigation links', () => {
        renderFooter()
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
        expect(screen.getByText('Imprint')).toBeInTheDocument();
    });

    it('renders the current year in the footer', () => {
        renderFooter();
        const currentYear = new Date().getFullYear();
        const yearElements = screen.getAllByText((_content, element) => {
            return element?.textContent?.includes(currentYear.toString()) ?? false;
        });
        expect(yearElements.length).toBeGreaterThan(0);
    });

    it('renders navigation links with correct hrefs', () => {
        renderFooter();
        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('Imprint').closest('a')).toHaveAttribute('href', '/imprint');
    });

});