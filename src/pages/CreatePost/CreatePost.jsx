import { UploadWidget } from "../../common/UploadWidget/UploadWidget"
import { useEffect, useState } from "react";
import "./CreatePost.css";
import { CInput } from "../../common/CInput/CInput";
import { CDropdown } from "../../common/CDropdown/CDropdown";
import { CButton } from "../../common/CButton/CButton";
import { CCard } from "../../common/CCard/CCard";
import processTag from "../../utils/processTag";
import isValidHashtag from "../../utils/isValidHashtag";
import { TimedPopupMsg } from "../../common/TimedPopupMsg/TimedPopupMsg";

export const CreatePost = () => {
    // const [imageUrl, setImageUrl] = useState("");
    const [newPost, setNewPost] = useState({
        imageUrl: "",
        caption: "",
        tags: [],
        visibility: "",
    });
    const [isNewTagOpen, setIsNewTagOpen] = useState(false);
    const [newTag, setNewTag] = useState("");
    const [errorMsg, setErrorMsg] = useState({
        serverError: {message: "", success: false},
        // imageError: "", //TODO check if needed
        // visibilityError: "", //TODO check if needed
    });
    const [popCounter, setPopCounter] = useState(0);

    useEffect(() => {
        console.log("New Post: ", newPost);
    }, [newPost])

    const constructImageURL = (publicId, fileExtension) => {
        const url = `https://res.cloudinary.com/dib7jxktr/image/upload/${publicId}.${fileExtension}`
        setNewPost({
            ...newPost,
            imageUrl: `https://res.cloudinary.com/dib7jxktr/image/upload/${publicId}.${fileExtension}`
        })
        // return url;
    }

    // useEffect(() => {
    //     console.log("Image URL: ", imageUrl);
    // }, [imageUrl])

    const handleInputChange = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
        setPopCounter(prevState => prevState + 1);
    }
    // const handleTagChange = (e) => {
    //     setNewTag(e.target.value);
    // }

    // const processTag = (tag) => {
    //     tag = tag.replace(/\s/g, "");
    
    //     if (tag[0] !== "#") {
    //         return "#" + tag.toLowerCase();
    //     }
    //     return tag.toLowerCase();
    // }

    const verifyPost = (post) => {
        if (post.imageUrl === "") {
            setErrorMsg({
                message: "Please upload an image",
                success: false
            })
            setPopCounter(prevState => prevState + 1);
            return;
        }
        if (post.visibility === "") {
            setErrorMsg({
                message: "Please select a visibility option",
                success: false
            })
            setPopCounter(prevState => prevState + 1);
            return;
        }
    }

    const validateTag = () => {
        const processedTag = processTag(newTag);
        if (isValidHashtag(processedTag)) {
            setNewPost(
                {
                    ...newPost, 
                    tags: [...newPost.tags, processedTag]
                }); 
            setNewTag("")
            setIsNewTagOpen(false)
        } else {
            // setErrorMsg({
            //     ...errorMsg,
            //     serverError: {
            //         message: "Invalid Tag",
            //         success: false
            //     }
            // })
            setErrorMsg({
                message: "Invalid Tag",
                success: false
            })
            setPopCounter(prevState => prevState + 1);
        }
    }
    
    return (
        <div>
            {errorMsg.message && 
                <TimedPopupMsg
                    key={popCounter}
                    message={errorMsg.message}
                    success={errorMsg.success}
                    time={5000}
                    resetServerError={() => setErrorMsg({message: "", success: false})}
                />
            }

            <div className="create-post-img-container">
                <img src={newPost.imageUrl || "https://via.placeholder.com/150"} alt="Post Image" />
            </div>
            <UploadWidget 
                onUploadSuccess={constructImageURL}
            />
            <CInput
                className="create-post-input"
                type="text"
                placeholder="Post Caption"
                name="caption"
                disabled=""
                value={newPost.caption || ""}
                onChangeFunction={handleInputChange}
            />
            <div className="create-post-tags">{newPost.tags}</div>
            <CInput
                className="create-post-input"
                type="text"
                placeholder="Tags"
                name="tags"
                disabled="disabled"
                value={newPost.tags || ""}
                onChangeFunction={handleInputChange}
            />
            <CButton 
                className="create-post-button"
                title="new tag"
                onClickFunction={() => setIsNewTagOpen(true)}
            />
            {/* <CCard
                className="create-post-card"
                title="Post Preview"
                content={newPost.caption}
                image={newPost.imageUrl || "https://via.placeholder.com/150"}
            /> */}
            <div className={isNewTagOpen ? "create-post-popup" : "create-post-popup-hidden"}>
                <CInput
                    className="create-post-input"
                    type="text"
                    placeholder="Tags"
                    name="tags"
                    disabled=""
                    value={newTag || ""}
                    onChangeFunction={(e) => setNewTag(e.target.value)}
                />
                <CButton 
                    className="create-post-button"
                    title="create tag"
                    onClickFunction={validateTag}
                />
                <CButton
                    className="create-post-button"
                    title="cancel"
                    onClickFunction={() => setIsNewTagOpen(false)}
                />
            </div>
            <CDropdown
                buttonClass="create-post-dropdown"
                dropdownClass="create-post-dropdown-item"
                title="visibility"
                items={[
                    {id: "public", name: "Public"},
                    {id: "private", name: "Private"},
                    {id: "friends", name: "Friends"},
                ]}
                onChangeFunction={handleInputChange}
                disabled=""
            />
            <CButton
                className="create-post-button"
                title="Post"
                onClickFunction={() => verifyPost(newPost)}
            />
        </div>
    )
}