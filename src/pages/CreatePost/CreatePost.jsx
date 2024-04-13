import { UploadWidget } from "../../common/UploadWidget/UploadWidget"
import { useEffect, useState } from "react";

export const CreatePost = () => {
    const [imageUrl, setImageUrl] = useState("");

    const constructImageURL = (publicId, fileExtension) => {
        const url = `https://res.cloudinary.com/dib7jxktr/image/upload/${publicId}.${fileExtension}`
        setImageUrl(`https://res.cloudinary.com/dib7jxktr/image/upload/${publicId}.${fileExtension}`)
        // return url;
    }

    useEffect(() => {
        console.log("Image URL: ", imageUrl);
    }, [imageUrl])
    
    return (
        <div>
            <UploadWidget 
                onUploadSuccess={constructImageURL}
            />
        </div>
    )
}