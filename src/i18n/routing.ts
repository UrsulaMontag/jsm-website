import {defineRouting} from "next-intl/routing";
import {createNavigation} from "next-intl/navigation";

export const routing = defineRouting({
    locales: ['en', 'de'],
    defaultLocale: 'de',
    pathnames: {
        '/': '/',
        '/about': {
            en: '/about',
            de: '/ueberUns'
        },
        '/gallery': {
            en: '/gallery',
            de: '/gallerie'
        },
        '/imprint': {
            en: '/imprint',
            de: '/impressum'
        }
    },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);