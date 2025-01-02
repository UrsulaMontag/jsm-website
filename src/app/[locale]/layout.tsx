import localFont from "next/font/local";
import "../globals.css";
import {Locale} from "@/i18n/routing";
import {NextIntlClientProvider} from "next-intl";
import {ReactNode} from "react";
import {getLayoutProps, metadata, viewport} from "./rootLayoutProps";
import {ThemeProvider} from '../helper/ThemeProvider';
import ThemeWrapper from '../helper/ThemeWrapper';

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

type LayoutProps = {
    children: ReactNode;
    params: Promise<{ locale: Locale; }>;
};

export {metadata, viewport};

export default async function RootLayout({
                                             children, params,
                                         }: LayoutProps) {
    const resolvedParams = await params;
    const {locale, messages} = await getLayoutProps(resolvedParams);

    console.log('Rendering RootLayout with locale:', locale);

    return (
        <ThemeProvider>
            <html lang={locale as string || 'de'}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-light-bg bg-opacity-80 text-light-text max-w-screen-xl flex flex-col justify-center items-center mx-auto`}
            >
            <ThemeWrapper>
                <NextIntlClientProvider messages={messages || undefined}>
                    <div data-testid="intl-provider">{children}</div>

                </NextIntlClientProvider>
            </ThemeWrapper>
            </body>
            </html>
        </ThemeProvider>
    );
}
