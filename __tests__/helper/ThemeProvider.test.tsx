import '@testing-library/jest-dom';
import {renderHook, act} from '@testing-library/react';
import {ThemeProvider, useTheme} from '@/app/helper/ThemeProvider';
import {ReactNode} from "react";

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});
describe('ThemeProvider', () => {
    it('provides the theme context', () => {
        const wrapper = ({children}: { children: ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;
        const {result} = renderHook(() => useTheme(), {wrapper});

        expect(result.current.isDarkMode).toBe(false);
    });

    it('toggles dark mode', () => {
        const wrapper = ({children}: { children: ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;
        const {result} = renderHook(() => useTheme(), {wrapper});

        act(() => {
            result.current.toggleDarkMode();
        });

        expect(result.current.isDarkMode).toBe(true);

        act(() => {
            result.current.toggleDarkMode();
        });

        expect(result.current.isDarkMode).toBe(false);
    });
});