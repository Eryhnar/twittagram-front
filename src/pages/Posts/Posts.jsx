import { useDispatch, useSelector } from "react-redux"
import { detailData } from "../../app/slices/detailSlice"
import { timeSince } from "../../utils/timeSince"
import { PostCard } from "../../common/PostCard/PostCard";
import { updateUser, userData } from "../../app/slices/userSlice";
import { toggleLikeService, toggleSaveService } from "../../services/apiCalls";
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
    const [posts, setPosts] = useState(rdxDetails.details);

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

    // return (

    //     {errorMsg.message !== "" && 
    //     <TimedPopupMsg
    //         key={popupCounter}
    //         success={errorMsg.success}
    //         message={errorMsg.message}
    //         time={4000}
    //         clearMsg={() => setErrorMsg({ message: "", success: false })}
    //     />
    //     }
    //     rdxDetails.details.map((post) => (
    //         <div key={post._id} className="timeline-posts">
    //             <PostCard 
    //                 post={post}
    //                 toggleLike={toggleLike}
    //                 toggleSave={toggleSave} 
    //             />
    //         </div>
    //     ))
    // )
    return (
        <div className="profile-posts-design">
            <>
                {errorMsg.message &&
                    <TimedPopupMsg
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
                        />
                    </div>
                ))}
            </>
        </div>
    )
}