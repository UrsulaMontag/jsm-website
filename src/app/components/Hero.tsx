import type {ImageType} from '@/types/cloudinary';
import {CldImage} from 'next-cloudinary';
import {useTranslations} from 'next-intl';
import {hero} from "../../../styles/fonts";
import Link from "next/link";

type HeroProps = {
    heroImage: ImageType | undefined;
};
export default function Hero({heroImage}: Readonly<HeroProps>) {
    const t = useTranslations("HomePage");

    return (
        <main className="flex flex-col sm:gap-8 row-start-2 items-center sm:items-start">
            <section aria-labelledby="hero-heading"
                     className="relative bg-cover bg-centers flex flex-col items-center justify-items-center  p-3 sm:p-10">
                {heroImage && <CldImage
                    src={heroImage.public_id}
                    width={heroImage.width}
                    height={heroImage.height}
                    alt="Hero image"
                    className="rounded-lg object-cover"
                    crop="fill"
                    gravity="auto"
                    priority={true}
                />}
                <div className="absolute top-12 sm:top-1/4 justify-center">
                    <h1 id="hero-heading" role="heading"
                        className={`${hero.className} font-extrabold  text-1xl text-center sm:text-4xl text-dark-text bg-dark-bg bg-opacity-50 p-2 sm:p-4 rounded-lg `}>
                        {t('welcome')}
                    </h1>

                </div>
                <Link href="#"
                      className="mt-6 inline-block bg-primary text-white text-lg sm:text-xl py-2 px-4 rounded-lg hover:bg-primary-dark"
                      data-testid="cta-button">
                    {t('cta')}
                </Link>
                <p className="mt-4 text-lg sm:text-2xl text-light-text bg-dark-bg bg-opacity-50 p-2 rounded-lg">
                    {t('description')}
                </p>

            </section>

            <section aria-labelledby="description-heading" className="py-6 sm:py-12 px-6">
                <p id="description-heading" className="mb-6 text-start">{t('description')}</p>
            </section>
        </main>
    );
}