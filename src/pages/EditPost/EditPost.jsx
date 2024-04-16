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
import { editPostService } from "../../services/apiCalls"
import { userData } from "../../app/slices/userSlice"

export const EditPost = () => {
    const rdxUser = useSelector(userData);
    const rdxPost = useSelector(detailData)
    const post = rdxPost.details;
    const [newPost, setNewPost] = useState({
        caption: post.caption,
        tags: post.tags,
        visibility: post.visibility,
        postId: post._id
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
            setErrorMsg({
                message: "Invalid Tag",
                success: false
            })
            setPopCounter(prevState => prevState + 1);
        }
    }

    const verifyPost = (post) => {
        if (post.visibility === "") {
            setErrorMsg({
                message: "Please select a visibility option",
                success: false
            })
            setPopCounter(prevState => prevState + 1);
            return;
        }
    }

    const editPost = async () => {
        try {
            verifyPost(newPost)
            if (errorMsg.message) {
                return;
            }
            const response = await editPostService(rdxUser.credentials.token ,newPost);
            setErrorMsg({
                message: response.message,
                success: response.success
            })
        } catch (error) {
            setErrorMsg({
                message: error.message,
                success: false
            })
            setPopCounter(prevState => prevState + 1);
        }
    }

    return (
        <div className="edit-post-design">
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
                <img 
                    src={post.image} 
                    onError={(e) => {e.target.onerror = null; e.target.src="../../../public/missing_post.jpg"}}
                    alt="post image" 
                />
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
            {isEditTagsOpen &&
            <div className="edit-post-tags-popup">
                {post.tags.map((tag, index) => (
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
                ))}
                <CButton
                    className="edit-post-button"
                    title="cancel"
                    onClickFunction={() => {
                        setIsEditTagsOpen(false);
                    }}
                />
            </div>
            }
            {isNewTagOpen && 
                <div className="edit-post-create-tags-popup">
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
                title="Update"
                onClickFunction={editPost}
            />
        </div>
    )
}