import {Leckerli_One, Roboto} from "next/font/google";

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    display: 'swap',
});
const hero = Leckerli_One({
    subsets: ['latin'],
    weight: ['400'],
    style: ['normal'],
    display: 'swap',
});

export {roboto, hero};
