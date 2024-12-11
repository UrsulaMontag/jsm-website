import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Lütjen-Deile-39 | Steinhuder Meer Holiday Home",
    description: "Discover Lütjen-Deile-39, a serene holiday home at the beautiful Steinhuder Meer in Niedersachsen. Perfect for a peaceful getaway surrounded by nature.",
    keywords: [
        "Steinhuder Meer",
        "holiday home",
        "Niedersachsen",
        "vacation rental",
        "Lütjen-Deile-39",
        "accessible accommodation",
    ],
    authors: [{name: "U. Montag", url: "https://example.com"}],
    openGraph: {
        title: "Lütjen-Deile-39 | Steinhuder Meer Holiday Home",
        description:
            "Enjoy the tranquility of Lütjen-Deile-39, located at the stunning Steinhuder Meer. A perfect blend of comfort and nature awaits.",
        url: "https://",
        images: [
            {
                url: "https://xxx/images/steinhuder-meer.jpg",
                width: 1200,
                height: 630,
                alt: "View of Steinhuder Meer",
            },
        ],
        type: "website",
    },
};
export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
