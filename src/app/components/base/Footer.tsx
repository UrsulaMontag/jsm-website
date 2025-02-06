import Link from 'next/link';
import {useTranslations} from 'next-intl';
import ThemeToggle from "@/app/helper/ThemeToggle";

export default function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="bg-neutral-beige dark:bg-dark-bg text-lake-blue dark:text-dark-highlight py-6">
            <div className="container mx-auto px-4">
                {/* Footer Top: Navigation and Contact */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start md:space-x-8">

                    {/* Navigation Links */}
                    <nav aria-label="Footer navigation" className="text-sm">
                        <ul className="flex gap-2">
                            {[
                                {path: '/' as const, key: 'home'},
                                {path: '/the-house' as const, key: 'theHouse'},
                                {path: '/gallery' as const, key: 'gallery'},
                                {path: '/activities' as const, key: 'activities'},
                                {path: '/contact' as const, key: 'contact'}
                            ].map(({path, key}) => (
                                <li key={key}>
                                    <Link
                                        href={path}
                                        className="hover:text-sunset-orange dark:hover:text-dark-highlight transition-colors"
                                    >
                                        {t(`nav.${key}`)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact Information */}
                    <div className="text-center md:text-left text-sm">
                        <p>{t('contact.email')}: <a href="mailto:info@ferienhaus-panoramablick.de"
                                                    className="underline">info@ferienhaus-panoramablick.de</a></p>
                        <p>{t('contact.phone')}: +49 123 456 789</p>
                        <p>{t('contact.address')}: Lütjen-Deile 39, 31515 Wunstorf, Germany</p>
                    </div>
                    {/* Footer Bottom: Imprint */}
                    <div className="text-center text-xs ">
                        <p>&copy; {new Date().getFullYear()} {t('imprint.copyright')}</p>
                        <p><Link href="/contact" className="underline">{t('imprint.link')}</Link></p>
                        <span></span>
                    </div>
                    <div className="text-center md:text-left text-sm">

                        <ThemeToggle/>
                    </div>

                </div>


            </div>
        </footer>
    );
}
