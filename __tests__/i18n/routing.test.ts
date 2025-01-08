import {getPathname, routing} from "@/i18n/routing";

describe('i18n routing configuration', () => {
    describe('routing config', () => {
        it('should have correct locales', () => {
            expect(routing.locales).toEqual(['en', 'de']);
            expect(routing.defaultLocale).toBe('de');
        });

        it('should have correct pathname mappings', () => {
            expect(routing.pathnames['/']).toBe('/');
            expect(routing.pathnames['/about']).toEqual({
                en: '/about',
                de: '/ueberUns'
            });
            expect(routing.pathnames['/gallery']).toEqual({
                en: '/gallery',
                de: '/gallerie'
            });
            expect(routing.pathnames['/imprint']).toEqual({
                en: '/imprint',
                de: '/impressum'
            });
        });
    });

    describe('getPathname', () => {
        it('should return correct paths for default locale', () => {
            expect(getPathname({href: '/', locale: 'de'})).toBe('/de');
            expect(getPathname({href: '/about', locale: 'de'})).toBe('/de/ueberUns');
            expect(getPathname({href: '/gallery', locale: 'de'})).toBe('/de/gallerie');
            expect(getPathname({href: '/imprint', locale: 'de'})).toBe('/de/impressum');
        });

        it('should return correct paths for English locale', () => {
            expect(getPathname({href: '/', locale: 'en'})).toBe('/en');
            expect(getPathname({href: '/about', locale: 'en'})).toBe('/en/about');
            expect(getPathname({href: '/gallery', locale: 'en'})).toBe('/en/gallery');
            expect(getPathname({href: '/imprint', locale: 'en'})).toBe('/en/imprint');
        });
    });
});