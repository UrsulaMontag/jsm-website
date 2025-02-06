'use client'

import {useTranslations} from 'next-intl';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import {ImageType} from "@/types/cloudinary";
import Image from "next/image";
import {cloudinaryLoader} from "@/lib/cloudinaryLoader";

type ActivityProps = {
    images: ImageType[] | undefined;
};
export default function Activities({images}: Readonly<ActivityProps>) {
    const t = useTranslations('HomePage.activities');

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: (
            <div>
                <button className="next-slick-arrow rotate-180" data-testid="prev-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960"
                         width="24">
                        <path
                            d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/>
                    </svg>
                </button>
            </div>
        ),
        nextArrow: (
            <div>
                <button className="next-slick-arrow" data-testid="next-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960"
                         width="24">
                        <path
                            d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/>
                    </svg>
                </button>
            </div>
        ),
    };

    const defaultImage: ImageType = {
        public_id: 'Ferienhaus_Steinhude/homepic_ppbju0_gpd5gj',
        width: 800,
        height: 600,
        alt: 'Default Image',

    };
    const findImage = (public_id: string): ImageType => {
        return images?.find((img) => img.public_id === public_id) || defaultImage;
    };
    const walkingImg: ImageType = findImage('Ferienhaus_Steinhude/activities/PXL_20230602_095846010_dmtmr0');
    const yogaImg: ImageType = findImage('Ferienhaus_Steinhude/activities/PXL_20220617_201714361_2_j7o4cx');
    const boatImg: ImageType = findImage('Ferienhaus_Steinhude/activities/ikorlrobn7obgd6luovn');
    const activities = [
        {
            title: t('walking.title'),
            description: t('walking.description'),
            image: {
                public_id: walkingImg.public_id,
                width: walkingImg.width,
                height: walkingImg.height,
            },
            alt: 'Walking in nature',
            pageLink: '/activities/walking',
        },
        {
            title: t('yoga.title'),
            description: t('yoga.description'),
            image: {
                public_id: yogaImg.public_id,
                width: yogaImg.width,
                height: yogaImg.height,
            },
            alt: 'Girl doing yoga on a private jetty',
            pageLink: '/activities/yoga',
        },
        {
            title: t('rowing.title'),
            description: t('rowing.description'),
            image: {
                public_id: boatImg.public_id,
                width: boatImg.width,
                height: boatImg.height,
            },
            alt: 'The house own rowing boat in the evening sun',
            pageLink: '/activities/rowing',
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
                        {images && images.length > 0 && (
                            <Slider {...sliderSettings}>
                                {activities.map((activity, index) => (
                                    <details key={activity.title}
                                             role="group"
                                             aria-roledescription="slide"
                                             aria-label={activity.title}
                                             className="relative h-80"
                                             style={{
                                                 height: index % 3 === 0 ? '300px' : '150px',
                                             }}>
                                        <Image
                                            loader={cloudinaryLoader}
                                            src={activity.image.public_id}
                                            alt={activity.alt}
                                            fill
                                            className="rounded-lg shadow-lg object-cover"
                                        />

                                        {/* Image Caption */}
                                        <div
                                            className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-md">
                                            <h3 className="text-xl font-semibold">{activity.title}</h3>
                                            <p className="text-sm">{activity.description}</p>
                                        </div>

                                        <Link href={activity.pageLink}
                                              className="absolute inset-0 z-10"
                                              aria-label={activity.title}/>
                                    </details>
                                ))}
                            </Slider>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
