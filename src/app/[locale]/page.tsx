import Hero from '../components/home/Hero';
import Head from "next/head";
import AboutHouse from "@/app/components/home/AboutHouse";
import Highlights from "@/app/components/home/Highlights";
import Activities from "@/app/components/home/Activities";
import LocationHighlight from "@/app/components/home/LocationHighlight";
import {images} from "@/content/images";


export default function Home() {
    const houseImages = images.filter(img => img.public_id.startsWith('Ferienhaus_Steinhude/aboutHouse'));
    const activityImages = images.filter(img => img.public_id.startsWith('Ferienhaus_Steinhude/activities'));
    const lakeImages = images.filter(img => img.public_id.startsWith('Ferienhaus_Steinhude/why_pbsh')
    );

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
                <meta property="og:url" content="https://jsm-website-two.vercel.app"/>
                <link rel="canonical" href="https://jsm-website-two.vercel.app"/>
            </Head>
            <div className="space-y-8 lg:space-y-10 ">
                <Hero/>
                <LocationHighlight images={lakeImages}/>
                <AboutHouse images={houseImages}/>
                <Highlights/>
                <Activities images={activityImages}/>
            </div>


        </>
    );
}


