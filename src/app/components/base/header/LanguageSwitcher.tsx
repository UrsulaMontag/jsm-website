import {useLocale, useTranslations} from "next-intl";
import {routing} from "@/i18n/routing";
import LocaleSwitcherSelect from "@/app/components/base/header/LocaleSwitcherSelect";

export default function LanguageSwitcher() {
    const t = useTranslations("LanguageSwitcher");
    const locale = useLocale();

    return (
        <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
            {routing.locales.map((locale) => (
                <option key={locale} value={locale}>
                    {t('locale', {locale: locale})}
                </option>
            ))}
        </LocaleSwitcherSelect>
    )
}