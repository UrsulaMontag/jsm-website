import {useTranslations} from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

export default function Activities() {
    const t = useTranslations('HomePage.activities');

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const activities = [
        {
            title: t('rowing.title'),
            description: t('rowing.description'),
            imageUrl: '/activities/bernd-dittrich-4mehD_N3N5Q-unsplash.webp',
            imageAlt: 'Rowing on a lake',
            author: 'hdbernd',
            link: 'https://unsplash.com/de/fotos/eine-person-in-einem-kleinen-boot-auf-einem-see-Wqm9tRrTYQk', // Photographer's profile link
        },
        {
            title: t('cycling.title'),
            description: t('cycling.description'),
            imageUrl: '/activities/matt-saling-6tK2Og9dEKA-unsplash.webp',
            imageAlt: 'Cycling',
            author: 'Matt Saling ',
            link: 'https://unsplash.com/de/fotos/schwarzes-rennrad-neben-brauner-holzwand-geparkt-6tK2Og9dEKA',
        },
        {
            title: t('walking.title'),
            description: t('walking.description'),
            imageUrl: '/activities/mariola-grobelska-tkuidfuPYUc-unsplash.webp',
            imageAlt: 'walking over a bridge',
            author: 'MARIOLA GROBELSKA',
            link: 'https://unsplash.com/de/fotos/eine-person-die-uber-eine-brucke-uber-ein-gewasser-geht-tkuidfuPYUc',
        },
    ];

    return (
        <section
            aria-labelledby="activities-heading"
            className="py-16  bg-neutral-beige dark:bg-dark-bg text-dark-text dark:text-dark-text"
        >
            <div className="container mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Section Heading and Description */}
                    <div className="lg:order-1 text-center lg:text-left">
                        <h2
                            id="activities-heading"
                            className="text-4xl md:text-5xl font-bold text-lake-blue dark:text-dark-highlight mb-4"
                        >
                            {t('title')}
                        </h2>
                        <p className="text-lg md:text-xl text-lake-blue dark:text-dark-text mb-6">
                            {t('description')}
                        </p>
                    </div>

                    {/* Right: Slider Section */}
                    <div className="lg:order-2">
                        <Slider {...sliderSettings}>
                            {activities.map((activity) => (
                                <div key={activity.title} className="relative">
                                    <Image
                                        src={activity.imageUrl}
                                        alt={activity.imageAlt}
                                        width={1200}
                                        height={800}
                                        className="rounded-lg shadow-lg"
                                        style={{objectFit: 'cover'}}

                                    />

                                    {/* Image Caption */}
                                    <div
                                        className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-md">
                                        <p className="text-xl font-semibold">{activity.title}</p>
                                        <p className="text-sm">{activity.description}</p>
                                    </div>

                                    {/* Image Attribution */}
                                    <p className="mt-2 text-xs text-center text-gray-500">
                                        Photo by <Link href={activity.link} target="_blank" rel="noopener noreferrer"
                                                       className="underline">{activity.author}</Link> on Unsplash
                                    </p>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
}
