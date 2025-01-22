import {useLocale, useTranslations} from "next-intl";
import {Locale, routing} from "@/i18n/routing";
import LocaleSwitcherSelect from "@/app/components/base/header/LocaleSwitcherSelect";

export default function LanguageSwitcher() {
    const t = useTranslations("LanguageSwitcher");
    const locale = useLocale();

    const isSupportedLocale = routing.locales.includes(locale as Locale);

    return (
        <div
            className="flex text-sunset-orange dark:text-dark-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-highlight">
            <LocaleSwitcherSelect defaultValue={locale}
                                  label={t("label", {default: "Sprache wechseln"})}>
                {!isSupportedLocale && (
                    <option value={locale}>
                        {locale}
                    </option>
                )}
                {routing.locales.map((locale) => (
                    <option key={locale} value={locale}>
                        {t(`locale.${locale}`, {default: locale === "de" ? "Deutsch" : locale})}
                    </option>
                ))}
            </LocaleSwitcherSelect>
        </div>

    )
}