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

        expect(screen.getByText('Logo')).toBeInTheDocument();

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();

        const languageSwitchers = screen.getAllByTestId('language-switcher');
        expect(languageSwitchers[0]).toBeInTheDocument();
        expect(languageSwitchers[1]).toBeInTheDocument();
    });

    it('toggles mobile menu when hamburger icon is clicked', () => {
        render(<Header/>);

        const menuButton = screen.getByTestId('menu-button');

        const navList = screen.getByRole('list');
        expect(navList).toHaveClass('hidden');

        fireEvent.click(menuButton);

        expect(navList).toHaveClass('block');

        fireEvent.click(menuButton);

        expect(navList).toHaveClass('hidden');
    });

    it('renders navigation links with correct hrefs', () => {
        render(<Header/>);

        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '/about');
    });
});
