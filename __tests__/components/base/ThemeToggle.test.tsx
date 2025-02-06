import {render, screen, fireEvent} from '@testing-library/react';
import ThemeToggle from '@/app/components/base/ThemeToggle';
import {useTheme} from '@/app/components/base/ThemeProvider';
import {NextIntlClientProvider} from 'next-intl';
import enMessages from '../../../messages/en.json';
// Mock the useTheme hook
jest.mock('@/app/components/base/ThemeProvider');

const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe('ThemeToggle', () => {
    const mockToggleDarkMode = jest.fn();

    beforeEach(() => {
        mockUseTheme.mockReturnValue({
            isDarkMode: false,
            toggleDarkMode: mockToggleDarkMode,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderThemeToggle = () => {
        return render(
            <NextIntlClientProvider locale="en" messages={enMessages}>
                <ThemeToggle/>
            </NextIntlClientProvider>
        );
    };

    it('renders correctly in light mode', () => {
        renderThemeToggle();
        expect(screen.getByText(/light/i)).toBeInTheDocument();

        const toggleDot = screen.getByTestId('theme-toggle-dot');
        expect(toggleDot).not.toHaveClass('transform translate-x-full');
    });

    it('renders correctly in dark mode', () => {
        mockUseTheme.mockReturnValue({
            isDarkMode: true,
            toggleDarkMode: mockToggleDarkMode,
        });

        renderThemeToggle();
        expect(screen.getByText(/dark/i)).toBeInTheDocument();

        const toggleDot = screen.getByTestId('theme-toggle-dot');
        expect(toggleDot).toHaveClass('transform translate-x-full');
    });

    it('calls toggleDarkMode when clicked', () => {
        renderThemeToggle();

        const label = screen.getByText(/dark|light/i);
        fireEvent.click(label);

        expect(mockToggleDarkMode).toHaveBeenCalledTimes(1);
    });

    it('has proper accessibility attributes', () => {
        renderThemeToggle();

        const toggle = screen.getByRole('checkbox', {hidden: true});
        expect(toggle).toHaveAttribute('type', 'checkbox');
        expect(toggle).toHaveStyle({display: 'none'});
    });

    it('applies correct dark mode styles to the dot', () => {
        mockUseTheme.mockReturnValue({
            isDarkMode: true,
            toggleDarkMode: mockToggleDarkMode,
        });

        renderThemeToggle();

        const toggleDot = screen.getByTestId('theme-toggle-dot');
        expect(toggleDot).toHaveClass('bg-gray-800');
    });

    it('applies correct light mode styles to the dot', () => {
        renderThemeToggle();

        const toggleDot = screen.getByTestId('theme-toggle-dot');
        expect(toggleDot).toHaveClass('bg-white');
    });
});