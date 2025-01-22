import {CldImage} from 'next-cloudinary';
import {useTranslations} from 'next-intl';
import {ImageType} from "@/types/cloudinary";
import {Link} from "@/i18n/routing";

type AboutHouseProps = {
    images: ImageType[];
};

export default function AboutHouse({images}: Readonly<AboutHouseProps>) {
    const t = useTranslations('HomePage');
    return (
        <section
            aria-labelledby="about-house-heading"
            className="py-12 bg-neutral-beige dark:bg-dark-bg text-dark-text dark:text-dark-text"
        >
            <div className="container mx-auto px-4 text-center">
                {/* Title */}
                <h2
                    id="about-house-heading"
                    className="text-3xl md:text-5xl font-bold text-lake-blue dark:text-dark-highlight"
                >
                    {t('about.title')}
                </h2>

                {/* Description */}
                <p
                    className="mt-4 text-lg md:text-xl text-dark-text dark:text-dark-highlight"
                    aria-label={t('about.description')}
                >
                    {t('about.description')}
                </p>

                {/* Image Grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image) => (
                        <div
                            data-testid="about-house-image"
                            key={image.public_id}
                            className="overflow-hidden rounded-lg"
                            aria-label="Image of Panoramablick house and surroundings"
                        >
                            <CldImage
                                src={image.public_id}
                                width={image.width}
                                height={image.height}
                                alt="View of the house or surroundings at Panoramablick"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <Link
                    href="/gallery"
                    className="mt-8 inline-block bg-sunset-orange hover:bg-sunset-orange-dark text-white text-lg py-3 px-6 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-highlight"
                    aria-label="Explore the house gallery"
                >
                    {t('about.cta')}
                </Link>
            </div>
        </section>
    );
}
