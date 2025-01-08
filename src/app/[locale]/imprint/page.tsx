import {Metadata} from "next";
import {useTranslations} from "next-intl";

export const metadata: Metadata = {
    title: "Imprint | Steinhuder Meer Holiday Home",
    description: "Discover Lütjen-Deile-39, a serene holiday home at the beautiful Steinhuder Meer in Niedersachsen. Perfect for a peaceful getaway surrounded by nature.",

};

export default function Imprint() {
    const t = useTranslations("Imprint");

    return (
        <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:gap-8 items-center sm:items-start">
                <h1 role="heading" className="text-2xl font-bold mb-4">{t('title')}</h1>
                <section aria-labelledby="company-info-heading">
                    <h2 id="company-info-heading" className="text-xl font-semibold mb-2">{t('companyInfo')}</h2>
                    <p>{t('companyName')}</p>
                    <p>{t('address')}</p>
                    <p>{t('contact')}</p>
                </section>
                <section aria-labelledby="legal-info-heading" className="mt-6">
                    <h2 id="legal-info-heading" className="text-xl font-semibold mb-2">{t('legalInfo')}</h2>
                    <p>{t('legalDetails')}</p>
                </section>
            </div>
        </main>
    );
}