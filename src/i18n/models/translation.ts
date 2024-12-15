export type Locale = "en" | "de";

export type Translations = {
    label: string;
    locale: Record<Locale, string>;
};