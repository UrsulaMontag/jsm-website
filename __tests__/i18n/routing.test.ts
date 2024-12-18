import {getPathname, routing} from "@/i18n/routing";

describe('i18n routing configuration', () => {
    describe('routing config', () => {
        it('should have correct locales', () => {
            expect(routing.locales).toEqual(['en', 'de']);
            expect(routing.defaultLocale).toBe('de');
        });

        it('should have correct pathname mappings', () => {
            expect(routing.pathnames['/']).toBe('/');
            expect(routing.pathnames['/pathnames']).toEqual({
                en: '/pathnames',
                de: '/pfadnamen'
            });
        });
    });

    describe('getPathname', () => {
        it('should return correct paths for default locale', () => {
            expect(getPathname({href: '/', locale: 'de'})).toBe('/de');
            expect(getPathname({href: '/pathnames', locale: 'de'})).toBe('/de/pfadnamen');
        });

        it('should return correct paths for English locale', () => {
            expect(getPathname({href: '/', locale: 'en'})).toBe('/en');
            expect(getPathname({href: '/pathnames', locale: 'en'})).toBe('/en/pathnames');
        });
    });
});