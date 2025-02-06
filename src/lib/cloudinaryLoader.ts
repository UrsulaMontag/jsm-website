'use client'

export const cloudinaryLoader = ({src, width, quality}: { src: string; width: number; quality?: number }) => {
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_${quality ?? 75},w_${width}/${src}`;
};