interface CldImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    className?: string;
    crop?: string;
    gravity?: string;

    [key: string]: unknown;
}

export const CldImage = ({
                             src,
                             alt,
                             width,
                             height,
                             // eslint-disable-next-line @typescript-eslint/no-unused-vars
                             priority, crop, gravity,
                             ...props
                         }: CldImageProps) => {
    return (
        // eslint-disable-next-line @next/next/no-img-element -- This is a mock component
        <img
            data-testid="cld-image"
            src={src}
            alt={alt}
            width={width}
            height={height}
            {...props}
        />
    );
};