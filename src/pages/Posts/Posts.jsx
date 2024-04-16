import { useDispatch, useSelector } from "react-redux"
import { detailData } from "../../app/slices/detailSlice"
import { PostCard } from "../../common/PostCard/PostCard";
import { updateUser, userData } from "../../app/slices/userSlice";
import { deletePostService, toggleLikeService, toggleSaveService } from "../../services/apiCalls";
import { TimedPopupMsg } from "../../common/TimedPopupMsg/TimedPopupMsg";
import { useState } from "react";

export const Posts = () => {
    const rdxUser = useSelector(userData);
    const rdxDetails = useSelector(detailData);
    const token = rdxUser.credentials.token;
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState({
        message: "",
        success: false
    });
    const [popupCounter, setPopupCounter] = useState(0);
    const [posts, setPosts] = useState(rdxDetails.details.posts);

        const toggleLike = async (post) => {
        try {
            const response = await toggleLikeService(token, post._id);
            setPosts(posts.map(item =>
                item._id === post._id
                    ? {
                        ...item,
                        likes: response.data.likes
                    }
                    : item
            ));
        } catch (error) {
            setErrorMsg({ message: error.message, success: false });
            setPopupCounter(prevState => prevState + 1);
        }
    }

    const toggleSave = async (postId) => {
        try {
            const response = await toggleSaveService(token, postId);
            rdxUser.credentials.user.saved.includes(postId)
                ? dispatch(updateUser({
                    user: {
                        ...rdxUser.credentials.user,
                        saved: rdxUser.credentials.user.saved.filter(id => id !== postId)
                    }
                }))
                : dispatch(updateUser({
                    user: {
                        ...rdxUser.credentials.user,
                        saved: [...rdxUser.credentials.user.saved, postId]
                    }
                }));

        } catch (error) {
            setErrorMsg({ message: error.message, success: false });
            setPopupCounter(prevState => prevState + 1);
        }
    }

    const deletePost = async (post) => {
        try {
            if (post.author.userHandle === rdxUser.credentials.user.userHandle) {
                const response = await deletePostService(rdxUser.credentials.token, post._id)
                setPosts(posts.filter(i => i._id !== post._id))
                setErrorMsg({ message: response.message, success: response.success });
            }
        } catch (error) {
            setErrorMsg({ message: error.message, success: false });
        }
    }

    return (
        <div className="profile-posts-design">
            <>
                {errorMsg.message !== "" &&
                    <TimedPopupMsg
                        key={popupCounter}
                        message={errorMsg.message}
                        success={errorMsg.success}
                        duration={5000}
                        resetServerError={() => setErrorMsg({ message: "", success: false })}
                    />
                }
                {posts.length > 0 && posts.map((post) => (
                    <div className="profile-posts" key={post._id}>
                        <PostCard
                            post={post}
                            toggleLike={toggleLike}
                            toggleSave={toggleSave}
                            deletePost={deletePost}
                            clickedPostId={rdxDetails.details.clickedPost}
                        />
                    </div>
                ))}
            </>
        </div>
    )
}