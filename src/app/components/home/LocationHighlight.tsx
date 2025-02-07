'use client'

import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {cloudinaryLoader} from '@/lib/cloudinaryLoader';
import {ImageType} from '@/types/cloudinary';
import {useCallback, useEffect, useState} from "react";
import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";

type LocationHighlightProps = {
    images: ImageType[];
};

export default function LocationHighlight({images}: Readonly<LocationHighlightProps>) {
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
    const t = useTranslations('HomePage.location');

    const handleNavigation = useCallback((direction: 'prev' | 'next', e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedImage(current => {
            if (!current || images.length === 0) return current;

            const currentIndex = images.findIndex(img => img.public_id === current.public_id);
            let newIndex: number;

            if (direction === 'next') {
                newIndex = (currentIndex + 1) % images.length;
            } else {
                newIndex = (currentIndex - 1 + images.length) % images.length;
            }

            return images[newIndex];
        });
    }, [images]);

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (!selectedImage) return;
            switch (e.key) {
                case 'ArrowLeft':
                    handleNavigation('prev');
                    break;
                case 'ArrowRight':
                    handleNavigation('next');
                    break;
                case 'Escape':
                    setSelectedImage(null);
                    break;
            }
        };
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [handleNavigation, selectedImage]);

    return (
        <section
            aria-labelledby="location-highlight-heading"
            className="relative py-16 bg-neutral-beige/90 dark:bg-dark-bg/90 backdrop-blur-sm overflow-hidden"
        >
            <div className="container mx-auto px-4 lg:px-12
">
                {/* Text Content */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2
                        id="location-highlight-heading"
                        className="text-4xl md:text-5xl font-bold text-lake-blue dark:text-dark-highlight mb-6"
                    >
                        {t('title')}
                    </h2>
                    <p className="text-lg md:text-xl text-lake-blue dark:text-dark-text">
                        {t('description')}
                    </p>
                </div>

                {/* Staggered Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px]">
                    {/* Main Panorama */}
                    <div
                        role="button"
                        className="md:col-span-8 h-full relative group overflow-hidden rounded-2xl shadow-2xl cursor-zoom-in"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(images[0]);
                        }}
                    >
                        <Image
                            loader={cloudinaryLoader}
                            src={images[0]?.public_id || 'default/fallback_image'}
                            fill={true}
                            alt={images[0]?.alt || 'Lakeside view'}
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 75vw"
                            priority={true}
                        />
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-lake-blue/30 to-transparent dark:from-dark-bg/40"/>
                    </div>

                    {/* Secondary Images Stack */}
                    <div className="md:col-span-4 grid grid-rows-2 gap-6 h-full">
                        {images.slice(1, 3).map((image) => (
                            <div
                                role="button"
                                key={image.public_id}
                                className="relative group overflow-hidden rounded-2xl shadow-2xl cursor-zoom-in"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(image);
                                }}
                            >
                                <Image
                                    loader={cloudinaryLoader}
                                    src={image.public_id}
                                    fill={true}
                                    alt={image.alt}
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-lake-blue/30 to-transparent dark:from-dark-bg/40"/>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lightbox Modal */}
                <Dialog
                    open={!!selectedImage}
                    onClose={() => setSelectedImage(null)}
                    className="fixed inset-0 z-50"
                >
                    <DialogBackdrop className="fixed inset-0 bg-black/75 backdrop-blur-lg"/>

                    {selectedImage && (
                        <DialogPanel
                            className="fixed inset-0 flex items-center justify-center p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full max-w-7xl h-[90vh]">
                                {/* Navigation Arrows */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => handleNavigation('prev', e)}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl p-2 hover:text-sunset-orange transition-colors backdrop-blur-sm bg-black/30 rounded-full z-50"
                                            aria-label={t('previous')}
                                        >
                                            &larr;
                                        </button>
                                        <button
                                            onClick={(e) => handleNavigation('next', e)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl p-2 hover:text-sunset-orange transition-colors backdrop-blur-sm bg-black/30 rounded-full z-50"
                                            aria-label={t('next')}
                                        >
                                            &rarr;
                                        </button>
                                    </>
                                )}

                                {/* Image Counter */}
                                <div
                                    className="absolute bottom-4 left-4 text-white backdrop-blur-sm bg-black/30 px-4 py-2 rounded-lg z-50">
                                    {`${images.findIndex(img => img.public_id === selectedImage.public_id) + 1} / ${images.length}`}
                                </div>

                                {/* Main Image */}
                                <Image
                                    loader={cloudinaryLoader}
                                    src={selectedImage.public_id}
                                    alt={selectedImage.alt}
                                    fill={true}
                                    className="object-contain"
                                    priority={true}
                                />

                                {/* Close Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImage(null);
                                    }}
                                    className="absolute top-4 right-4 text-white text-2xl p-2 hover:text-sunset-orange transition-colors z-50"
                                    aria-label={t('close')}
                                >
                                    ✕
                                </button>
                            </div>
                        </DialogPanel>
                    )}
                </Dialog>

                {/* Floating Features */}
                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    {['view', 'access', 'privacy'].map((feature) => (
                        <div
                            key={feature}
                            className="p-8  bg-sunset-gradient dark:bg-sunset-gradient-dark rounded-2xl shadow-lg"
                        >
                            <h3 className="text-2xl font-bold text-lake-blue dark:text-dark-highlight mb-4">
                                {t(`features.${feature}.title`)}
                            </h3>
                            <p className="text-lake-blue dark:text-dark-text">
                                {t(`features.${feature}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}