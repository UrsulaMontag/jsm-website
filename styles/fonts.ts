import {Great_Vibes, Roboto} from "next/font/google";

const body = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    display: 'swap',
    preload: false,
});
const hero = Great_Vibes({
    subsets: ['latin'],
    weight: ['400'],
    style: ['normal'],
    display: 'swap',
    preload: false,
});

export {body, hero};
