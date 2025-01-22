import {getPathname, routing} from "@/i18n/routing";

describe('routing config', () => {
    it('should have correct locales', () => {
        expect(routing.locales).toEqual(['en', 'de']);
        expect(routing.defaultLocale).toBe('de');
    });

    it('should have correct pathname mappings', () => {
        expect(routing.pathnames['/']).toBe('/');
        expect(routing.pathnames['/the-house']).toEqual({
            en: '/the-house',
            de: '/das-haus'
        });
        expect(routing.pathnames['/gallery']).toEqual({
            en: '/gallery',
            de: '/gallerie'
        });
        expect(routing.pathnames['/activities']).toEqual({
            en: '/activities',
            de: '/Aktivitäten'
        });
        expect(routing.pathnames['/contact']).toEqual({
            en: '/contact',
            de: '/kontakt'
        });
    });
});

describe('getPathname', () => {
    it('should return correct paths for default locale', () => {
        expect(getPathname({href: '/', locale: 'de'})).toBe('/de');
        expect(getPathname({href: '/the-house', locale: 'de'})).toBe('/de/das-haus');
        expect(getPathname({href: '/gallery', locale: 'de'})).toBe('/de/gallerie');
        expect(getPathname({href: '/activities', locale: 'de'})).toBe('/de/Aktivitäten');
        expect(getPathname({href: '/contact', locale: 'de'})).toBe('/de/kontakt');
    });

    it('should return correct paths for English locale', () => {
        expect(getPathname({href: '/', locale: 'en'})).toBe('/en');
        expect(getPathname({href: '/the-house', locale: 'en'})).toBe('/en/the-house');
        expect(getPathname({href: '/gallery', locale: 'en'})).toBe('/en/gallery');
        expect(getPathname({href: '/activities', locale: 'en'})).toBe('/en/activities');
        expect(getPathname({href: '/contact', locale: 'en'})).toBe('/en/contact');
    });
});
