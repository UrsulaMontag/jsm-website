import "../globals.css";
import { Locale } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { getLayoutProps, metadata, viewport } from "./rootLayoutProps";
import { ThemeProvider } from '../helper/ThemeProvider';
import ThemeWrapper from '../helper/ThemeWrapper';
import { roboto } from "../../../styles/fonts";
import Header from "@/app/components/base/header/Header";
import Footer from "@/app/components/base/Footer";

type LayoutProps = {
    children: ReactNode;
    params: Promise<{ locale: Locale; }>;
};

export { metadata, viewport };

export default async function RootLayout ( {
    children, params,
}: LayoutProps )
{

    const resolvedParams = await params;
    const { locale, messages } = await getLayoutProps( resolvedParams );

    return (
        <ThemeProvider>
            <html lang={ locale as string || 'de' }>
                <body
                    className={
                        `${ roboto.className } antialiased min-h-screen flex flex-col bg-light-bg bg-opacity-80 text-light-text`
                    }>
                    <ThemeWrapper>
                        <NextIntlClientProvider messages={ messages || undefined }>
                            <div className="flex flex-col min-h-screen w-full" data-testid="intl-provider">
                                <Header />
                                { children }
                                <Footer />
                            </div>
                        </NextIntlClientProvider>
                    </ThemeWrapper>
                </body>
            </html>
        </ThemeProvider>
    );
}
