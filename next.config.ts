import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',


            },
        ],
        loader: 'cloudinary',
        path: 'https://res.cloudinary.com/montagu666/image/upload/',
    },
   
};

export default withNextIntl(nextConfig);
