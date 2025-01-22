import {defineRouting} from "next-intl/routing";
import {createNavigation} from "next-intl/navigation";

export const routing = defineRouting({
    locales: ['en', 'de'],
    defaultLocale: 'de',
    pathnames: {
        '/': '/',
        '/the-house': {
            en: '/the-house',
            de: '/das-haus'
        },
        '/gallery': {
            en: '/gallery',
            de: '/gallerie'
        },
        '/activities': {
            en: '/activities',
            de: '/Aktivitäten'
        },
        '/contact': {
            en: '/contact',
            de: '/kontakt'
        }
    },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);