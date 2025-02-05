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
            className="py-16 bg-neutral-beige/90 dark:bg-dark-bg/90 backdrop-blur-sm text-dark-text dark:text-dark-text"
        >
            <div className="container mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Text Section */}
                    <div className="text-center lg:text-left">
                        <h2
                            id="about-house-heading"
                            className="text-4xl md:text-5xl font-bold text-lake-blue dark:text-dark-highlight mb-4"
                        >
                            {t('about.title')}
                        </h2>

                        <p aria-label={t('about.description')}
                           className="text-lg md:text-xl text-lake-blue dark:text-dark-text mb-6"
                        >
                            {t('about.description')}
                        </p>

                        <Link aria-label="Explore the house gallery"
                              href="/gallery"
                              className="inline-block bg-sunset-orange hover:bg-sunset-orange-dark text-white text-lg py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                        >
                            {t('about.cta')}
                        </Link>
                    </div>

                    {/* Image Section */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                            <div data-testid="about-house-image"
                                 key={key(index)}
                                 className={`relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transform transition-transform hover:scale-110`}
                                 style={{
                                     gridRow: index % 3 === 0 ? 'span 2' : 'span 1',
                                     height: index % 3 === 0 ? '300px' : '150px',
                                 }}
                            >
                                <Image
                                    loader={cloudinaryLoader}
                                    src={image.public_id}
                                    fill
                                    alt="Panoramablick house view"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
