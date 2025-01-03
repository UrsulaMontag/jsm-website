import Footer from "@/app/components/base/Footer";
import {render, screen} from "@testing-library/react";

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
    }
}));

describe('Footer', () => {
    it('renders the footer with navigation links', () => {
        render(<Footer/>);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
        expect(screen.getByText('Imprint')).toBeInTheDocument();
    });

    it('renders the current year in the footer', () => {
        render(<Footer/>);

        const currentYear = new Date().getFullYear();
        const yearElements = screen.getAllByText((_content, element) => {
            return element?.textContent?.includes(currentYear.toString()) ?? false;
        });
        expect(yearElements.length).toBeGreaterThan(0);
    });

    it('renders navigation links with correct hrefs', () => {
        render(<Footer/>);

        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('Imprint').closest('a')).toHaveAttribute('href', '/');
    });
    
});