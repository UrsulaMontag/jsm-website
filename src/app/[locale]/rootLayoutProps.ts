import {getMessages} from 'next-intl/server';
import {Locale, routing} from '@/i18n/routing';
import type {Metadata} from 'next';

export async function getLayoutProps(params: { locale: Locale; }) {
    const cookies = await import('next/headers').then(m => m.cookies());
    const cookieLocale = cookies.get('NEXT_LOCALE')?.value as Locale | undefined;

    let validLocale: "en" | "de";
    if (cookieLocale && routing.locales.includes(cookieLocale)) {
        validLocale = cookieLocale;
    } else if (routing.locales.includes(params.locale)) {
        validLocale = params.locale;
    } else {
        validLocale = "de";
    }

    return {
        locale: validLocale,
        messages: await getMessages({locale: validLocale})
    };
}

export const metadata: Metadata = {
    title: "Lütjen-Deile-39 | Steinhuder Meer Holiday Home",
    description: "Discover Lütjen-Deile-39, a serene holiday home at the beautiful Steinhuder Meer in Niedersachsen. Perfect for a peaceful getaway surrounded by nature.",
    keywords: [
        "Steinhuder Meer",
        "holiday home",
        "Niedersachsen",
        "vacation rental",
        "Lütjen-Deile-39",
        "accessible accommodation",
    ],
    authors: [{name: "U. Montag", url: "https://example.com"}],
    openGraph: {
        title: "Lütjen-Deile-39 | Steinhuder Meer Holiday Home",
        description: "Enjoy the tranquility of Lütjen-Deile-39, located at the stunning Steinhuder Meer. A perfect blend of comfort and nature awaits.",
        url: "https://",
        images: [
            {
                url: "https://xxx/images/steinhuder-meer.jpg",
                width: 1200,
                height: 630,
                alt: "View of Steinhuder Meer",
            },
        ],
        type: "website",
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};
