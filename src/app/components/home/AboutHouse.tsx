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
            className="py-16 bg-neutral-beige dark:bg-dark-bg text-dark-text dark:text-dark-text"
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

                        <p
                            className="text-lg md:text-xl text-lake-blue dark:text-dark-text mb-6"
                        >
                            {t('about.description')}
                        </p>

                        <Link
                            href="/gallery"
                            className="inline-block bg-sunset-orange hover:bg-sunset-orange-dark text-white text-lg py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                        >
                            {t('about.cta')}
                        </Link>
                    </div>

                    {/* Image Section */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                            <div
                                key={image.public_id}
                                className={`relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transform transition-transform hover:scale-110`}
                                style={{
                                    gridRow: index % 3 === 0 ? 'span 2' : 'span 1', // Dynamic height for a masonry feel
                                }}
                            >
                                <CldImage
                                    src={image.public_id}
                                    width={image.width}
                                    height={image.height}
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
