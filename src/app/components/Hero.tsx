import type {ImageType} from '@/types/cloudinary';
import {CldImage} from 'next-cloudinary';
import {useTranslations} from 'next-intl';

type HeroProps = {
    heroImage: ImageType | undefined;
};
export default function Hero({heroImage}: Readonly<HeroProps>) {
    const t = useTranslations("HomePage");

    return (
        <main className="flex flex-col sm:gap-8 row-start-2 items-center sm:items-start">
            <section aria-labelledby="hero-heading"
                     className="relative bg-cover bg-centers flex flex-col items-center justify-items-center  p-3 sm:p-10 font-[family-name:var(--font-geist-sans)]">
                {heroImage && <CldImage
                    src={heroImage.public_id}
                    width={heroImage.width}
                    height={heroImage.height}
                    alt="Hero image"
                    className="rounded-lg object-cover"
                    crop="fill"
                    gravity="auto"
                />}
                <div className="absolute top-12 sm:top-1/4 justify-center">
                    <h2 id="hero-heading" role="heading"
                        className="font-bold  text-1xl text-center sm:text-4xl text-dark-text bg-dark-bg bg-opacity-50 p-2 sm:p-4 rounded-lg">
                        {t('welcome')}
                    </h2>
                </div>
            </section>

            <section aria-labelledby="description-heading" className="py-6 sm:py-12 px-6 text-center">
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