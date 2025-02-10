import {Link} from "@/i18n/routing";
import {useTranslations} from "next-intl";

export default function NotFound() {
    const t = useTranslations('ErrorPage');

    return (
        <section className="flex flex-col items-center justify-center h-screen bg-neutral-beige dark:bg-dark-bg z-10">
            <h1 className="text-5xl font-bold text-lake-blue dark:text-dark-highlight mb-8">{t('title')}</h1>
            <p className="text-lg text-center mb-6">{t('description')}</p>
            <p className="text-lg text-center mb-8">{t('comingSoon')}</p>

            {/* Link back to homepage */}
            <Link href="/"
                  className="inline-block bg-sunset-orange hover:bg-sunset-orange-dark text-white text-lg py-3 px-6 rounded-lg shadow-lg hover:shadow-xl">
                {t('backToHome')}
            </Link>
        </section>
    );
}
