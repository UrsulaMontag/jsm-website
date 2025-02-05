import "../globals.css";
import {Locale} from "@/i18n/routing";
import {NextIntlClientProvider} from "next-intl";
import {ReactNode} from "react";
import {getLayoutProps, metadata, viewport} from "./rootLayoutProps";
import {ThemeProvider} from '../helper/ThemeProvider';
import ThemeWrapper from '../helper/ThemeWrapper';
import {body} from "../../../styles/fonts";
import Header from "@/app/components/base/header/Header";
import Footer from "@/app/components/base/Footer";
import SunsetFloatingOrbs from "../../../styles/SunsetFloatingOrbs";

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
                className={`${body.className} min-h-screen bg-sunset-gradient dark:bg-sunset-gradient-dark transition-colors duration-300 antialiased`}>
            <SunsetFloatingOrbs/>
            <ThemeWrapper>
                <NextIntlClientProvider messages={messages || undefined}>
                    <div className="flex flex-col gap-y-8 lg:gap-10 min-h-screen w-full"
                         data-testid="intl-provider">
                        <Header/>
                        {children}
                        <Footer/>
                    </div>
                </NextIntlClientProvider>
            </ThemeWrapper>
            </body>
            </html>
        </ThemeProvider>
    );
}
