import type {ImageType} from '@/types/cloudinary';
import {CldImage} from 'next-cloudinary';
import {useTranslations} from 'next-intl';

type HeroProps = {
    heroImage: ImageType | undefined;
};
export default function Hero({heroImage}: Readonly<HeroProps>) {
    const t = useTranslations("HomePage");

    return (
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <section aria-labelledby="hero-heading"
                     className="relative bg-cover bg-center h-[50vh] flex flex-col items-center justify-items-center min-h-screen p-8 pb-20  sm:p-20 font-[family-name:var(--font-geist-sans)]">
                {heroImage && <CldImage
                    src={heroImage.public_id}
                    width={heroImage.width}
                    height={heroImage.height}
                    alt="Hero image"
                    crop="fill"
                />}
                <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
                    <h2 id="hero-heading" role="heading"
                        className="text-white font-bold text-center">
                        {t('welcome')}
                    </h2>
                </div>
            </section>

            <section aria-labelledby="description-heading" className="py-12 px-6 text-center">
                <p id="description-heading" className="mb-6">{t('description')}</p>
            </section>

            {/* Footer 
                <footer className="bg-gray-800 text-white py-6 mt-12">
                    <div className="container mx-auto text-center">
                        <p>&copy; 2024 {t('Header.logo')} | {t('LanguageSwitcher.label')}</p>
                    </div>
                </footer>*/}
        </main>
    );
}