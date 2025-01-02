'use client';

import Header from "@/app/components/base/header/Header";
import {useEffect, useState} from "react";
import {ImageType} from "@/types/cloudinary";
import Hero from '../components/Hero';


export default function Home() {
    const [images, setImages] = useState<ImageType[]>([]);
    const imagePrefix = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

    const heroImage: ImageType | undefined = images.find(img => img.public_id === 'Ferienhaus_Steinhude/lx0ismrhkehom7mkmdtv');

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(`api/fetchImages?tag=${imagePrefix}`);
            const data = await response.json();
            setImages(data);
        };

        fetchImages().then(() => console.log("Images fetched"));
    }, [imagePrefix]);

    return (
        <>
            <Header/>
            <Hero heroImage={heroImage}/>
        </>
    );
}
