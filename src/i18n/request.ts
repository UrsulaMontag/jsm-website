import {getRequestConfig} from "next-intl/server";
import {Locale, routing} from "@/i18n/routing";


export default getRequestConfig(async ({requestLocale}) => {
    const resolvedLocale = await requestLocale;
    let locale: Locale | undefined = resolvedLocale as Locale;

    if (!locale || !routing.locales.includes(locale)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});