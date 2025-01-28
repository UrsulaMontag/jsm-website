'use client';

import {useEffect, useState} from "react";
import {ImageType} from "@/types/cloudinary";
import Hero from '../components/home/Hero';
import Head from "next/head";
import AboutHouse from "@/app/components/home/AboutHouse";
import Highlights from "@/app/components/home/Highlights";
import Activities from "@/app/components/home/Activities";


export default function Home() {
    const [images, setImages] = useState<ImageType[]>([]);
    const imagePrefix = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

    const heroImage: ImageType | undefined = images.find(img => img.public_id === 'Ferienhaus_Steinhude/q5rmzqeq9e5wp1d61tm3');
    const houseImages: ImageType[] = images.filter(img => img.public_id.startsWith('Ferienhaus_Steinhude/aboutHouse')).slice(0, 3);

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
            <Head>
                <title>Ferienhaus Panoramablick - Your Private Lakeside Retreat</title>
                <meta
                    name="description"
                    content="Enjoy peace, wellness, and relaxation at Ferienhaus Panoramablick on the shores of Steinhuder Meer. Private jetty, secluded garden, and sauna."
                />
                <meta name="robots" content="index, follow"/>
                <meta property="og:title" content="Ferienhaus Panoramablick"/>
                <meta
                    property="og:description"
                    content="Discover our lakeside retreat, complete with a private jetty and luxury amenities. Book your stay at Ferienhaus Panoramablick."
                />
                <meta property="og:image"
                      content={heroImage ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${heroImage.public_id}` : 'default_image_path'}/>
                <meta property="og:url" content="https://jsm-website-two.vercel.app"/>
                <link rel="canonical" href="https://jsm-website-two.vercel.app"/>
            </Head>
            <Hero heroImage={heroImage}/>
            <AboutHouse images={houseImages}/>
            <Highlights/>
            <Activities/>
        </>
    );
}
