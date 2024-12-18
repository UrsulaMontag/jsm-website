import {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';

type MockServerRootLayoutProps = {
    children: ReactNode,
    locale: string,
    messages: Record<string, string>,
};

export default function MockServerRootLayout({
                                                 children,
                                                 locale,
                                                 messages,
                                             }: MockServerRootLayoutProps) {
    if (locale !== 'en' && locale !== 'de') {
        notFound(); // Call the mocked `notFound` for unsupported locales
    }
    return (
        <div data-testid="root-layout" lang={locale}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
            </NextIntlClientProvider>
        </div>
    );
}
