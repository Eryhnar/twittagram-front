import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { PostCard } from "../../common/PostCard/PostCard";
import { savedPostsService } from "../../services/apiCalls";

export const SavedPosts = () => {
    const rdxUser = useSelector(userData);
    const [posts, setPosts] = useState([]);
    const [retries, setRetries] = useState(3);
    const [errorMsg, setErrorMsg] = useState({
        message: "",
        success: false
    });
    const [popupCounter, setPopupCounter] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getSavedPosts = async () => {
            try {
                const response = await savedPostsService(rdxUser.credentials.token);
                console.log(response.data);
                setPosts(response.data);
            } catch (error) {
                if (retries > 0) {
                    setRetries(prevState => prevState - 1);
                } else {
                    setErrorMsg({ message: error.message, success: false });
                }
            }
        }
        rdxUser.credentials.token && retries > 0 ? getSavedPosts() : setIsLoading(false);
    }, [retries, rdxUser.credentials.token])

    const toggleLike = async (post) => {
        // console.log(post._id);
        try {
            const response = await toggleLikeService(token, post._id);
            // console.log(response);
            // console.log(post.likes);
            // setRetries(3);
            setPosts(posts.map(item =>
                item._id === post._id
                    ? {
                        ...item,
                        likes: response.data.likes
                    }
                    : item
            ));
            // console.log(post.likes);
        } catch (error) {
            // if (retries > 0) {
            //     setRetries(prevState => prevState - 1);
            // } else {
            setErrorMsg({ message: error.message, success: false });
            setPopupCounter(prevState => prevState + 1);
            // }
        }
    }

    const toggleSave = async (postId) => {
        try {
            // console.log(postId);
            // console.log(rdxUser.credentials.user);
            // console.log(rdxUser.credentials.user.saved);
            const response = await toggleSaveService(token, postId);
            // console.log(response);
            // dispatch(updateUser({ token: rdxUser.credentials.token, user: response.data }));
            rdxUser.credentials.user.saved.includes(postId)
                ? dispatch(updateUser({
                    // token: rdxUser.credentials.token,
                    user: {
                        ...rdxUser.credentials.user,
                        saved: rdxUser.credentials.user.saved.filter(id => id !== postId)
                    }
                }))
                : dispatch(updateUser({
                    // token: rdxUser.credentials.token,
                    user: {
                        ...rdxUser.credentials.user,
                        saved: [...rdxUser.credentials.user.saved, postId]
                    }
                }));
            // response.data.saved.includes(postId) ? console.log("saved") : console.log("unsaved");

        } catch (error) {
            setErrorMsg({ message: error.message, success: false });
            setPopupCounter(prevState => prevState + 1);
        }
    }

    const deletePost = async (post) => {
        // console.log(post._id);
        // console.log(post);
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
        <div>
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
                    // console.log(post),
                    <div className="saved-posts" key={post._id}>
                        <PostCard
                            post={post}
                            toggleLike={toggleLike}
                            toggleSave={toggleSave}
                            deletePost={deletePost}
                            clickedPostId={""}
                        />
                    </div>
                ))}
        </div>
    )
}