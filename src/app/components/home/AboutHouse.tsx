import {useTranslations} from 'next-intl';
import {Link} from "@/i18n/routing";
import Image from "next/image";
import {ImageType} from "@/types/cloudinary";
import {cloudinaryLoader} from "@/lib/cloudinaryLoader";

type AboutHouseProps = {
    images: ImageType[];
};

export default function AboutHouse({images}: Readonly<AboutHouseProps>) {
    const t = useTranslations('HomePage');
    const key = (index: number) => index;


    return (
        <section
            aria-labelledby="about-house-heading"
            className="py-20 bg-neutral-beige/90 dark:bg-dark-bg/90 backdrop-blur-sm"
        >
            <div className="container mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left space-y-6">
                        <h2
                            id="about-house-heading"
                            className="text-4xl md:text-5xl font-bold text-lake-blue dark:text-dark-highlight mb-4 bg-clip-text bg-gradient-to-r from-sunset-orange to-lake-blue dark:from-amber-glow dark:to-dark-highlight"
                        >
                            {t('about.title')}
                        </h2>

                        <p aria-label={t('about.description')}
                           className="text-lg md:text-xl text-lake-blue dark:text-dark-text mb-6 leading-relaxed"
                        >
                            {t('about.description')}
                        </p>

                        <Link aria-label="Explore the house gallery"
                              href="/gallery"
                              className="inline-block bg-sunset-orange hover:bg-sunset-orange-dark text-white text-lg py-3 px-8 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            {t('about.cta')}
                        </Link>
                    </div>

                    {/* Image Section */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                            <div data-testid="about-house-image"
                                 key={key(index)}
                                 className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 group"
                                 style={{
                                     gridRow: index % 3 === 0 ? 'span 2' : 'span 1',
                                     height: index % 3 === 0 ? '300px' : '150px',
                                 }}
                            >
                                <Image
                                    loader={cloudinaryLoader}
                                    src={image.public_id}
                                    fill={true}
                                    alt="Panoramablick house view"
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
