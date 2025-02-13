// Since we have a root `not-found.tsx` page, a layout file
// is required, even if it's just passing children through.

import {ReactNode} from "react";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {Locale} from "@/i18n/routing";
import {getLayoutProps} from "@/app/[locale]/rootLayoutProps";
import {pick} from "lodash";

type LayoutProps = {
    children: ReactNode;
    params: Promise<{ locale: Locale; }>;
};
export default async function RootLayout({children, params}: Readonly<LayoutProps>) {
    const messages = await getMessages();
    const resolvedParams = await params;
    const {locale} = await getLayoutProps(resolvedParams);
    return (
        <html lang={locale}>
        <body>
        <NextIntlClientProvider
            locale={locale}
            // Make sure to provide at least the messages for `Error`
            messages={pick(messages, 'Error')}
        >
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}