import Link from 'next/link';
import {useTranslations} from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="bg-neutral-beige dark:bg-dark-bg text-lake-blue dark:text-dark-highlight py-6">
            <div className="container mx-auto px-4">
                {/* Footer Top: Navigation and Contact */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start md:space-x-8">

                    {/* Navigation Links */}
                    <nav aria-label="Footer navigation" className="text-sm mb-4 md:mb-0">
                        <ul className="flex flex-wrap justify-center md:justify-start space-x-4">
                            <li>
                                <Link href="/" className="hover:underline">
                                    {t('nav.home')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/the-house" className="hover:underline">
                                    {t('nav.theHouse')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="hover:underline">
                                    {t('nav.gallery')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/activities" className="hover:underline">
                                    {t('nav.activities')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:underline">
                                    {t('nav.contact')}
                                </Link>
                            </li>
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
                </div>


            </div>
        </footer>
    );
}
