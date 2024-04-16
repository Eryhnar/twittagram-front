import { useEffect, useRef, useState } from "react"
import { CButton } from "../CButton/CButton";

export const UploadWidget = ({ onUploadSuccess }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            cloudinaryRef.current = window.cloudinary;
            widgetRef.current = cloudinaryRef.current.createUploadWidget({
                cloudName: "dib7jxktr",
                uploadPreset: "ml_default"
            }, (error, result) => {
                if (!error && result.info.public_id) {
                    onUploadSuccess(result.info.public_id, result.info.format);
                    setIsOpen(false);
                } else if (error){
                    throw new Error("Error uploading image: ", error);
                }
            })
            widgetRef.current.open();
        }
        return () => {
            if (widgetRef.current) {
                widgetRef.current.close();
            }
        }
    }, [isOpen]);

    const openWidget = () => {
        setIsOpen(true);
    }

    return (
        <CButton 
            className={"upload-widget-button"}
            title={"Upload Image"}
            onClickFunction={() => openWidget()}
        />
    )
}