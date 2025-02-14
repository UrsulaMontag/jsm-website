// Since we have a root `not-found.tsx` page, a layout file
// is required, even if it's just passing children through.

import {ReactNode} from "react";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {Locale} from "@/i18n/routing";
import {pick} from "lodash";

type LayoutProps = {
    children: ReactNode;
    params: { locale: Locale; };
};
export default async function RootLayout({children, params}: LayoutProps) {
    const messages = await getMessages({locale: params.locale});

    return (
        <NextIntlClientProvider
            locale={params.locale}
            // Make sure to provide at least the messages for `Error`
            messages={pick(messages, 'Error')}
        >
            {children}
        </NextIntlClientProvider>
    );
}