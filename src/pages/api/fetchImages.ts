import cloudinary from "@/lib/cloudinaryConfig";
import {ImageType} from "@/types/cloudinary";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const folderName = "Ferienhaus_Steinhude";
        const result = await cloudinary.v2.api.resources({
            type: 'upload',
            prefix: folderName,
            max_results: 30,
        });

        const images: ImageType[] = result.resources.map((resource: {
            asset_id: string;
            public_id: string;
            sizes: string;
            width: number;
            height: number;
            folder: string;
            url: string;
            alt: string;
        }) => ({
            asset_id: resource.asset_id,
            public_id: resource.public_id,
            sizes: resource.sizes,
            width: resource.width,
            height: resource.height,
            folder: resource.folder,
            url: resource.url,
            alt: resource.alt || "Image description",
        }));

        console.log("Cloudinary Result:", images[0]);
        res.status(200).json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to'})
    }
}