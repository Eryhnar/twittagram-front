import { CInput } from "../CInput/CInput"
import { useState } from "react"

export const PostDetPopup = ({ post, closePopup, saveChanges, deletePost }) => {
    const [changes, setChanges] = useState({ 
        caption: post.caption, 
        tags: post.tags 
    });
    const [originalPost] = useState({
        caption: post.caption,
        tags: post.tags
    });

    const handleInput = (e) => {
        setChanges((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <div className="post-details-popup">
            <div className="post-details-popup-header">
                <div className="post-details-popup-header-author-info">
                    <div>{post.author.userName}</div>
                    <div>{post.author.userHandle}</div>
                </div>
                <div>{post.createdAt}</div>
            </div>
            <div className="post-details-popup-img">
                <img src={post.image} alt="post" />
            </div>
            <CInput
                className={"post-details-popup-caption"}
                type="text"
                placeholder="caption"
                value={post.caption}
                onChangeFunction={(e) => handleInput(e)}
            />
            <CInput
                className={"post-details-popup-tags"}
                type="text"
                placeholder="tags"
                value={post.tags}
                onChangeFunction={(e) => handleInput(e)}
            />
        </div>
    )
}