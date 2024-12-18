import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';

export async function getLayoutProps(params: { locale: string }) {
    const locale = routing.locales.includes(params.locale) ? params.locale : null;

    if (!locale) {
        return {locale: null, messages: null};
    }

    const messages = await getMessages(locale);

    return {locale, messages};
}
