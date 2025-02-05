'use client'

import {useTranslations} from 'next-intl';
import Link from "next/link";
import Image from "next/image";
import {cloudinaryLoader} from "@/lib/cloudinaryLoader";


export default function Hero() {
    const t = useTranslations("HomePage");

    return (
        <section aria-labelledby="hero-heading" data-testid="hero"
                 className="relative h-screen bg-sunset-gradient flex flex-col justify-center items-center">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    loader={cloudinaryLoader}
                    src={`/Ferienhaus_Steinhude/q5rmzqeq9e5wp1d61tm3`}
                    fill
                    alt="Hero image of sunset over Steinhuder Meer"
                    priority
                    fetchPriority={'high'}
                    quality={90}
                    className="object-cover"
                    data-testid="hero-image"
                />
                <div
                    className="absolute inset-0 bg-gradient-to-b from-sunset-orange-light/40 via-sunset-orange/30 to-sunset-orange-dark/40 dark:from-shadow-black/50 dark:via-amber-glow/30 dark:to-sunset-orange/40"/>
            </div>


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