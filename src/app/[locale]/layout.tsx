import "../globals.css";
import {Locale} from "@/i18n/routing";
import {NextIntlClientProvider} from "next-intl";
import {ReactNode} from "react";
import {getLayoutProps, metadata, viewport} from "./rootLayoutProps";
import {ThemeProvider} from '../helper/ThemeProvider';
import ThemeWrapper from '../helper/ThemeWrapper';
import {roboto} from "../../../styles/fonts";

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

    return (
        <ThemeProvider>
            <html lang={locale as string || 'de'}>
            <body
                className={
                    `${roboto.className} antialiased bg-light-bg bg-opacity-80 text-light-text max-w-screen-xl flex flex-col justify-center items-center mx-auto`}>
            <ThemeWrapper>
                <NextIntlClientProvider messages={messages || undefined}>
                    <div data-testid="intl-provider">
                        {children}
                    </div>
                </NextIntlClientProvider>
            </ThemeWrapper>
            </body>
            </html>
        </ThemeProvider>
    );
}
