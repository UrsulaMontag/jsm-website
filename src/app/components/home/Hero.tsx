import type {ImageType} from '@/types/cloudinary';
import {CldImage} from 'next-cloudinary';
import {useTranslations} from 'next-intl';
import Link from "next/link";

type HeroProps = {
    heroImage: ImageType | undefined;
};
export default function Hero({heroImage}: Readonly<HeroProps>) {
    const t = useTranslations("HomePage");

    return (
        <section aria-labelledby="hero-heading" data-testid="hero"
                 className="relative h-screen bg-sunset-gradient flex flex-col justify-center items-center">
            {/* Background Image */}
            {heroImage && (
                <CldImage
                    src={heroImage.public_id}
                    width={heroImage.width}
                    height={heroImage.height}
                    alt="Hero image of sunset over Steinhuder Meer"
                    className="absolute inset-0 w-full h-full object-cover"
                    priority
                    crop="fill"
                    gravity="auto"
                />
            )}

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-bold text-neutral-beige dark:text-dark-highlight">
                    {t('hero.title')}
                </h1>

                {/* Subtitle */}
                <p className="mt-4 text-lg md:text-2xl text-neutral-beige dark:text-dark-text">
                    {t('hero.subtitle')}
                </p>

                {/* Call-to-Action Button */}
                <Link data-testid="cta-button"
                      href="https://www.novasol.de/ferienhaeuser/wunstorf-steinhuder-meer-dns281"
                      className="mt-8 inline-block bg-sunset-orange hover:bg-sunset-orange-dark text-white text-lg py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                    {t('hero.cta')}
                </Link>
            </div>
        </section>
    );
}