import { useState } from "react"
import { CButton } from "../../common/CButton/CButton"
import { CDropdown } from "../../common/CDropdown/CDropdown"
import { CInput } from "../../common/CInput/CInput"
import { TimedPopupMsg } from "../../common/TimedPopupMsg/TimedPopupMsg"
import processTag from "../../utils/processTag"
import isValidHashtag from "../../utils/isValidHashtag"
import { useSelector } from "react-redux"
import { detailData } from "../../app/slices/detailSlice"
import "./EditPost.css"

export const EditPost = () => {
    const rdxPost = useSelector(detailData)
    const post = rdxPost.details;
    // console.log("Post: ", post);
    const [newPost, setNewPost] = useState({
        caption: post.caption,
        tags: post.tags,
        visibility: post.visibility,
    });

    const [isNewTagOpen, setIsNewTagOpen] = useState(false);
    const [newTag, setNewTag] = useState("");
    const [errorMsg, setErrorMsg] = useState({
        message: "",
        success: false
    });
    const [popCounter, setPopCounter] = useState(0);
    const [isEditTagsOpen, setIsEditTagsOpen] = useState(false);

    const handleInputChange = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
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

    const editPost = () => {
        console.log("Edit Post: ", newPost);
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

            <div className="edit-post-img-container">
                <img src={post.image || "https://via.placeholder.com/150"} alt="Post Image" />
            </div>
            <CInput
                className="edit-post-input"
                type="text"
                placeholder="Post Caption"
                name="caption"
                disabled=""
                value={newPost.caption || ""}
                onChangeFunction={handleInputChange}
            />
            <div className="edit-post-tags">{newPost.tags}</div>
            <CInput
                className="edit-post-input"
                type="text"
                placeholder="Tags"
                name="tags"
                disabled="disabled"
                value={newPost.tags || ""}
                onChangeFunction={handleInputChange}
            />
            <CButton
                className="edit-post-button"
                title="edit tags"
                onClickFunction={() => setIsEditTagsOpen(true)}
            />
            <CButton 
                className="edit-post-button"
                title="new tag"
                onClickFunction={() => setIsNewTagOpen(true)}
            />
            {/* <CCard
                className="create-post-card"
                title="Post Preview"
                content={newPost.caption}
                image={newPost.imageUrl || "https://via.placeholder.com/150"}
            /> */}
            {isEditTagsOpen &&
                post.tags.map((tag, index) => (
                    <>
                        <div key={index} className="edit-post-tags">
                            {tag}
                        </div>
                        <CButton
                            className="edit-post-button"
                            title="delete"
                            onClickFunction={() => setNewPost({...newPost, tags: newPost.tags.filter((_, i) => i !== index)})}
                        />
                    </>
                ))
            }
            {isNewTagOpen && 
                <div className="edit-post-popup">
                    <CInput
                        className="edit-post-input"
                        type="text"
                        placeholder="Tags"
                        name="tags"
                        disabled=""
                        value={newTag || ""}
                        onChangeFunction={(e) => setNewTag(e.target.value)}
                    />
                    <CButton 
                        className="edit-post-button"
                        title="create tag"
                        onClickFunction={validateTag}
                    />
                    <CButton
                        className="edit-post-button"
                        title="cancel"
                        onClickFunction={() => setIsNewTagOpen(false)}
                    />
                </div>
            }
            <div>{post.visibility}</div>
            <CDropdown
                buttonClass="edit-post-dropdown"
                dropdownClass="edit-post-dropdown-item"
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
                className="edit-post-button"
                title="Post"
                onClickFunction={editPost}
            />
        </div>
    )
}