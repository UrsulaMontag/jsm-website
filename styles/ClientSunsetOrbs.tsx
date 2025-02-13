'use client';

import dynamic from "next/dynamic";

const SunsetFloatingOrbs = dynamic(() => import('./SunsetFloatingOrbs'), {ssr: false});

export default function ClientSunsetOrbs() {
    return <SunsetFloatingOrbs/>;
}