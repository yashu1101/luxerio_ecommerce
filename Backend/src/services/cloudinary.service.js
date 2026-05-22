
import { v2 as cloudinary } from 'cloudinary';



const uploadOnCloudinary = async (dest, filePath) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });

        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
            folder: dest,
            quality: "auto",
            fetch_format: "auto",
            flags: "lossy",
        });

        return uploadResult.secure_url;

    } catch (error) {
        console.log("Cloudinary error:", error);
        return null; 
    }
};


export { uploadOnCloudinary }
