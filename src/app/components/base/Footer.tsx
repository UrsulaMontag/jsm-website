import {useTranslations} from 'next-intl';
import Link from 'next/link';

export default function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer data-testid="footer"
                className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text py-6 mt-12">
            <div className="container mx-auto text-center">
                <nav aria-label="Footer navigation">
                    <ul className="flex flex-wrap justify-center space-x-4">
                        <li>
                            <Link href="/public" className="hover:underline">
                                {t('nav.home')}
                            </Link>
                        </li>
                        <li>
                            <Link href="/public" className="hover:underline">
                                {t('nav.about')}
                            </Link>
                        </li>
                        <li>
                            <Link href="/public" className="hover:underline">
                                {t('nav.contact')}
                            </Link>
                        </li>
                        <li>
                            <Link href="/public" className="hover:underline">
                                {t('nav.imprint')}
                            </Link>
                        </li>
                    </ul>
                </nav>
                <p className="mt-4" data-testid="copyright">&copy; {new Date().getFullYear()} {t('copyright')}</p>
            </div>
        </footer>
    );
}