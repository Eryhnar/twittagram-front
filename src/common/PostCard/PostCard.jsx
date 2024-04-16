import { useDispatch, useSelector } from "react-redux";
import { timeSince } from "../../utils/timeSince";
import { updateUser, userData } from "../../app/slices/userSlice";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveDetails } from "../../app/slices/detailSlice";
import "./PostCard.css"
import "../../../public/Missing_avatar.svg"

export const PostCard = ({ post, toggleLike, toggleSave, deletePost, clickedPostId}) => {
    const rdxUser = useSelector(userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const postRef = useRef(null);

    const [isOpenOptions, setIsOpenOptions] = useState(false);

    useEffect(() => {
        if (post._id === clickedPostId && postRef.current) {
            postRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [clickedPostId]);

    return (
        <div className="post-card" ref={postRef}>

            <div className="post-card-header">
                <div className="post-card-header-left">
                    <div className="post-card-author-img" onClick={() => {
                        dispatch(saveDetails(post.author))
                        navigate("/profile");
                    }}>
                        <img 
                            src={post.author.profilePicture} 
                            onError={(e) => {e.target.onerror = null; e.target.src="../../../public/Missing_avatar.svg"}}
                            alt="author image" 
                        />
                    </div>
                    <div className="post-card-header-author-info">
                        <div onClick={() => {
                            dispatch(saveDetails(post.author))
                            navigate("/profile");
                        }}>{post.author.userName}</div>
                        <div>{post.author.userHandle}</div>
                    </div>
                    <div className="post-card-time">{timeSince(new Date(post.createdAt))}</div>
                </div>
                    {post.author.userHandle === rdxUser.credentials.user.userHandle &&
                        <div onClick={() => setIsOpenOptions(true)}><span className="material-symbols-outlined">more_vert</span></div>
                    }

                {isOpenOptions && 
                    <div className="post-card-options">
                        <div onClick={() => {
                            dispatch(saveDetails(post));
                            navigate("/edit-post");
                        }}>Edit</div>
                        <div onClick={() => {
                            deletePost(post);
                        }}>Delete</div>
                    </div>
                }
            </div>

            <div className="post-card-img" onClick={() => {
                dispatch(saveDetails(post))
            }}>
                <img 
                    src={post.image} 
                    onError={(e) => {e.target.onerror = null; e.target.src="../../../public/missing_post.jpg"}}
                    alt="post image" 
                />
            </div>
            <div className="post-card-text">
                <p>{post.caption}</p>
                <div>{post.tags}</div>
            </div>
            <div className="post-card-interactions-container">

                <div className="post-like-container">
                    <div onClick={() => toggleLike(post)}><span className={`material-symbols-outlined ${post.likes.includes(rdxUser.credentials.user.id) ? "favorited" : null}`} /*TODO style here*/ >favorite</span></div>
                    <div className="post-interaction-statistics">
                        <div>{post.likes.length}</div>
                        <div>likes</div>
                    </div>
                </div>
                <div className="post-comment-container">
                    <div><span className="material-symbols-outlined">add_comment</span></div>
                    <div className="post-interaction-statistics">
                        <div>comments</div>
                    </div>
                </div>
                <div className="post-save-container">
                <div onClick={() => toggleSave(post._id)}><span className={`material-symbols-outlined ${rdxUser.credentials.user.saved.includes(post._id) ? "saved" : null}`}>bookmark</span></div>
                </div>
            </div>
        </div>
    )
}