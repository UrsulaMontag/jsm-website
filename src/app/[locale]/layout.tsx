import "../globals.css";
import {Locale, routing} from "@/i18n/routing";
import {NextIntlClientProvider} from "next-intl";
import {ReactNode} from "react";
import {getLayoutProps, metadata, viewport} from "./rootLayoutProps";
import {ThemeProvider} from '../components/base/ThemeProvider';
import ThemeWrapper from '../components/base/ThemeWrapper';
import {body} from "../../../styles/fonts";
import Header from "@/app/components/base/header/Header";
import Footer from "@/app/components/base/Footer";
import {notFound} from "next/navigation";
import ClientSunsetOrbs from "../../../styles/ClientSunsetOrbs";
import {pick} from "lodash";


type LayoutProps = {
    children: ReactNode;
    params: { locale: Locale; };
};

export {metadata, viewport};

export default async function RootLayout({
                                             children, params,
                                         }: Readonly<LayoutProps>) {

    const {locale, messages} = await getLayoutProps(params);

    if (!routing.locales.includes(locale as Locale)) {
        notFound();
    }


    return (
        <ThemeProvider>
            <html lang={locale}>
            <body
                className={`min-h-screen bg-sunset-gradient dark:bg-sunset-gradient-dark transition-colors duration-300 antialiased ${body.className}`}>
            <ClientSunsetOrbs/>
            <ThemeWrapper>
                <NextIntlClientProvider locale={locale}
                                        messages={pick(messages, ['Error', 'Header', 'Footer', 'HomePage', `LanguageSwitcher`, `ThemeToggle`])}>
                    <div className="flex flex-col min-h-screen w-full"
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
