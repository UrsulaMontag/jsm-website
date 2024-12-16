import {defineRouting} from "next-intl/routing";
import {createNavigation} from "next-intl/navigation";

export const routing = defineRouting({
    locales: ['en', 'de'],
    defaultLocale: 'de',
    pathnames: {
        '/': '/',
        '/pathnames': {
            en: '/pathnames',
            de: '/pfadnamen'
        }
    },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);