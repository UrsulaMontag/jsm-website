import {getMessages} from 'next-intl/server';
import {Locale, routing} from '@/i18n/routing';

export async function getLayoutProps(params: { locale: Locale }) {
    const locale = routing.locales.includes(params.locale) ? params.locale : undefined;

    if (!locale) {
        return {locale: undefined, messages: null};
    }

    const messages = await getMessages({locale});

    return {locale, messages};
}
