import {render} from '@testing-library/react';
import SunsetFloatingOrbs from '../../styles/SunsetFloatingOrbs';


describe('SunsetFloatingOrbs Component', () => {
    let requestAnimationFrameSpy: jest.SpyInstance;
    let cancelAnimationFrameSpy: jest.SpyInstance;
    beforeAll(() => {
        jest.useFakeTimers();
        requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
        cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('applies floating animation through transform property', () => {
        const {getAllByTestId} = render(<SunsetFloatingOrbs/>);

        jest.advanceTimersByTime(16);

        const orb = getAllByTestId('sunset-orb')[0];
        const transform = orb.style.transform;

        expect(transform).toMatch(/translate\((-?\d+\.?\d*)px, (-?\d+\.?\d*)px\)/);
    });

    it('renders 10 orbs with initial positions within viewport bounds', () => {
        const {getAllByTestId} = render(<SunsetFloatingOrbs/>);

        const orbs = getAllByTestId('sunset-orb');
        expect(orbs).toHaveLength(10);

        orbs.forEach(orb => {
            const style = window.getComputedStyle(orb);
            const top = parseFloat(style.top);
            const left = parseFloat(style.left);

            expect(top).toBeGreaterThanOrEqual(0);
            expect(top).toBeLessThanOrEqual(100);
            expect(left).toBeGreaterThanOrEqual(0);
            expect(left).toBeLessThanOrEqual(100);
        });
    });

    it('applies floating animation through transform property', () => {
        const {getAllByTestId} = render(<SunsetFloatingOrbs/>);

        jest.advanceTimersByTime(100);
        const orb = getAllByTestId('sunset-orb')[0];
        const transform = orb.style.transform;

        expect(transform).toMatch(/translate\((-?\d+\.?\d*)px, (-?\d+\.?\d*)px\)/);
    });

    it('cancels animation frame on unmount', () => {
        const {unmount} = render(<SunsetFloatingOrbs/>);

        jest.advanceTimersByTime(16);

        expect(requestAnimationFrameSpy).toHaveBeenCalled();

        const frameId = requestAnimationFrameSpy.mock.results[0].value;

        unmount();

        expect(cancelAnimationFrameSpy).toHaveBeenCalledWith(frameId);
    });
});