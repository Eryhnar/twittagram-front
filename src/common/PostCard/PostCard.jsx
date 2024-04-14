import { useDispatch, useSelector } from "react-redux";
import { timeSince } from "../../utils/timeSince";
import { updateUser, userData } from "../../app/slices/userSlice";
import { useEffect, useRef, useState } from "react";
import { toggleLikeService, toggleSaveService } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { saveDetails } from "../../app/slices/detailSlice";

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

    // useEffect(() => { 
    //     const closeMenu = () => {
    //         setIsOpenOptions(false);
    //     };
    
    //     if (isOpenOptions) {
    //         document.addEventListener('mousedown', closeMenu);
    //     } else {
    //         document.removeEventListener('mousedown', closeMenu);
    //     }
    
    //     return () => {
    //         document.removeEventListener('mousedown', closeMenu);
    //     };
    // }, [isOpenOptions]);

    // const toggleLike = async (post) => {
    //     // console.log(post._id);
    //     try {
    //         const response = await toggleLikeService(token, post._id);
    //         // console.log(response);
    //         // console.log(post.likes);
    //         // setRetries(3);
    //         setPosts(posts.map(item =>
    //             item._id === post._id
    //                 ? {
    //                     ...item,
    //                     likes: response.data.likes
    //                 }
    //                 : item
    //         ));
    //         // console.log(post.likes);
    //     } catch (error) {
    //         // if (retries > 0) {
    //         //     setRetries(prevState => prevState - 1);
    //         // } else {
    //         setErrorMsg({ message: error.message, success: false });
    //         // }
    //     }
    // }

    // const toggleSave = async (postId) => {
    //     try {
    //         // console.log(postId);
    //         // console.log(rdxUser.credentials.user);
    //         // console.log(rdxUser.credentials.user.saved);
    //         const response = await toggleSaveService(token, postId);
    //         // console.log(response);
    //         // dispatch(updateUser({ token: rdxUser.credentials.token, user: response.data }));
    //         rdxUser.credentials.user.saved.includes(postId)
    //             ? dispatch(updateUser({
    //                 // token: rdxUser.credentials.token,
    //                 user: {
    //                     ...rdxUser.credentials.user,
    //                     saved: rdxUser.credentials.user.saved.filter(id => id !== postId)
    //                 }
    //             }))
    //             : dispatch(updateUser({
    //                 // token: rdxUser.credentials.token,
    //                 user: {
    //                     ...rdxUser.credentials.user,
    //                     saved: [...rdxUser.credentials.user.saved, postId]
    //                 }
    //             }));
    //         // response.data.saved.includes(postId) ? console.log("saved") : console.log("unsaved");

    //     } catch (error) {
    //         setErrorMsg({ message: error.message, success: false });
    //     }
    // }
    // deletePost = async (postId) => {
    //     try {
    //         const response = await deletePostService(rdxUser.credentials.token, postId);
    //         console.log(response);
    //         dispatch(updateUser({ user: response.data.user }));
    //         setPosts(posts.filter(post => post._id !== postId));
    //     } catch (error) {
    //         setErrorMsg({ message: error.message, success: false });
    //     }
    // }

    return (
        <div className="timeline-post" ref={postRef}>
            {/* <div key={post._id} className="post" onClick={() => {
                                console.log(post);
                                dispatch(saveDetails({ details: post }));
                            }}> */}
            {/* <h3>{post.author.userName}</h3> */}
            <div className="timeline-post-header">
                <div className="timeline-post-author-img" onClick={() => {
                    // console.log(post.author);
                    dispatch(saveDetails(post.author))
                    navigate("/profile");
                }}>
                    <img src={post.author.profilePicture} alt="author image" />
                </div>
                {/* {post.author.profilePicture}</div> */}

                <div className="timeline-post-header-author-info">
                    <div onClick={() => {
                        dispatch(saveDetails(post.author))
                        navigate("/profile");
                    }}>{post.author.userName}</div>
                    <div>{post.author.userHandle}</div>
                </div>
                {/* <div>{post.createdAt}</div> */}
                <div>{timeSince(new Date(post.createdAt))}</div>
                {post.author.userHandle === rdxUser.credentials.user.userHandle &&
                    <div onClick={() => setIsOpenOptions(true)}><span className="material-symbols-outlined">more_vert</span></div>
                }
                {isOpenOptions && 
                    <div className="timeline-post-options">
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
            {/* <div onClick={() => {
                                    dispatch(saveDetails({ details: post }))
                                    console.log(post);
                                }}> */}
            {/* <div> */}
            {/* <img
                                        src={post.author.profilePicture}
                                        alt="author image"
                                        onClick={() => {
                                            console.log("click");
                                            dispatch(saveDetails({ details: post }));
                                        }}
                                    /> */}
            {/* <img src={post.author.profilePicture} alt="author image" /> */}
            {/* </div> */}
            <div className="timeline-post-img" onClick={() => {
                dispatch(saveDetails(post))
            }}>
                <img src={post.image} alt="post" />
            </div>
            <p>{post.caption}</p>
            <div>{post.tags}</div>
            <div className="timeline-post-interactions-container">
                <div className="post-interaction-buttons">
                    <div onClick={() => toggleLike(post)}><span className={`material-symbols-outlined ${post.likes.includes(rdxUser.credentials.user.id) ? "favorited" : null}`} /*TODO style here*/ >favorite</span></div>
                    <div><span className="material-symbols-outlined">add_comment</span></div>
                    <div onClick={() => toggleSave(post._id)}><span className={`material-symbols-outlined ${rdxUser.credentials.user.saved.includes(post._id) ? "saved" : null}`}>bookmark</span></div>
                </div>
                <div className="post-interaction-statistics">
                    <div>{post.likes.length}</div>
                    <div>likes</div>
                    {/* <div>{post.comments.length}</div> */}
                    <div>comments</div>
                    {/* <div>{post.comments}</div> */}
                </div>
            </div>
        </div>
    )
}