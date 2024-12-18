import Header from '@/app/components/base/header/Header';
import {render, screen, fireEvent} from '@testing-library/react';

jest.mock('next-intl', () => ({
    useTranslations: () => (key: string) => {
        const translations: Record<string, string> = {
            'logo': 'Logo',
            'nav.home': 'Home',
            'nav.about': 'About'
        };
        return translations[key] || key;
    }
}));

// Mock the LanguageSwitcher component
jest.mock('@/app/components/base/header/LanguageSwitcher', () => {
    return function MockLanguageSwitcher() {
        return <div data-testid="language-switcher">Language Switcher</div>;
    };
});

describe('Header', () => {
    it('renders the header with logo and navigation links', () => {
        render(<Header/>);

        // Check if logo is present
        expect(screen.getByText('Logo')).toBeInTheDocument();

        // Check if navigation links are present
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();

        // Check if language switcher is rendered
        expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    });

    it('toggles mobile menu when hamburger icon is clicked', () => {
        render(<Header/>);

        // Get the hamburger menu button using data-testid
        const menuButton = screen.getByTestId('menu-button');

        // Initially, the menu should be hidden on mobile
        const navList = screen.getByRole('list');
        expect(navList).toHaveClass('hidden');

        // Click the hamburger menu
        fireEvent.click(menuButton);

        // Menu should be visible
        expect(navList).toHaveClass('block');

        // Click again to hide
        fireEvent.click(menuButton);

        // Menu should be hidden again
        expect(navList).toHaveClass('hidden');
    });

    it('renders navigation links with correct hrefs', () => {
        render(<Header/>);

        // Check if links have correct href attributes
        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/public');
        expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '/about');
    });
});
