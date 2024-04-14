import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, userData } from "../../app/slices/userSlice";
import { TimedPopupMsg } from "../../common/TimedPopupMsg/TimedPopupMsg";
import { useState, useEffect } from "react";
import { getTimelineService, toggleLikeService, toggleSaveService } from "../../services/apiCalls";
import { detailData, saveDetails } from "../../app/slices/detailSlice";
import { useNavigate } from "react-router-dom";
import { timeSince } from "../../utils/timeSince";
import { PostCard } from "../../common/PostCard/PostCard";
import { Virtuoso } from "react-virtuoso";

export const Home = () => {
    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState({
        message: "",
        success: false
    });
    const [retries, setRetries] = useState(3);
    const [isLoading, setIsLoading] = useState(true);
    const [timeline, setTimeline] = useState([]);
    const [page, setPage] = useState(1);

    const fetchTimeline = async (page) => {
        try {
            const response = await getTimelineService(token, page);
            setTimeline(prevTimeline => [...prevTimeline, ...response.data]);
            setRetries(3);
        } catch (error) {
            if (retries > 0) {
                setRetries(prevState => prevState - 1);
            } else {
                setErrorMsg({ message: error.message, success: false });
            }
        }
    }

    useEffect(() => {
        fetchTimeline(page);
    }, [page]);

    // useEffect(() => {
    //     const fetchTimeline = async () => {
    //         try {
    //             const response = await getTimelineService(token, page);
    //             setTimeline(response.data);
    //             setRetries(3);
    //             // console.log(response);
    //         } catch (error) {
    //             if (retries > 0) {
    //                 setRetries(prevState => prevState - 1);
    //             } else {
    //                 setErrorMsg({ message: error.message, success: false });
    //             }
    //         }
    //     }
    //     token && retries > 0 ? fetchTimeline() : setIsLoading(false);
    //     // if (token && retries > 0) {
    //     //     fetchTimeline();
    //     // } else {
    //     //     setIsLoading(false);
    //     // }
    // }, [retries])

    const toggleLike = async (post) => {
        // console.log(post._id);
        try {
            const response = await toggleLikeService(token, post._id);
            // console.log(response);
                // console.log(post.likes);
                // setRetries(3);
                setTimeline(timeline.map(item => 
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
            if (retries > 0) {
                setRetries(prevState => prevState - 1);
            } else {
                setErrorMsg({ message: error.message, success: false });
            }
        }
    }

    return (
        <div className="home-design">
            {!token
                ?
                <div className="home-guest">
                    <h1>Welcome to Twittagram</h1>
                    <h2>Share your thoughts with the world</h2>
                    <p>Sign up or log in to see your timeline</p>
                    <button onClick={() => navigate("/signup")}>Sign Up</button>
                    <button onClick={() => navigate("/login")}>Log In</button>
                </div>

                :
                <>
                    {errorMsg.message &&
                        <TimedPopupMsg
                            message={errorMsg.message}
                            success={errorMsg.success}
                            duration={5000}
                            resetServerError={() => setErrorMsg({ message: "", success: false })}
                        />
                    }
                    <Virtuoso
                        data={timeline}
                        itemContent={(_, post) => (
                            <PostCard
                                post={post}
                                toggleLike={toggleLike}
                                toggleSave={toggleSave}
                            />
                        )}
                        style={{height: "90vh"}}
                        // endReached={() => setPage(prevPage => prevPage + 1)}
                        endReached={async () => {
                            try {
                                const response = await getTimelineService(token, page + 1);
                                if (response.data.length > 0) {
                                    setTimeline(prevTimeline => [...prevTimeline, ...response.data]);
                                    setPage(prevPage => prevPage + 1);
                                    setRetries(3);
                                }
                            } catch (error) {
                                if (retries > 0) {
                                    setRetries(prevRetries => prevRetries - 1);
                                } else {
                                    setErrorMsg({ message: error.message, success: false });
                                }
                            }
                        }}
                    />
                    {/* {timeline.length > 0 && timeline.map((post) => (
                        <div className="timeline-posts" key={post._id}>
                            <PostCard
                                post={post}
                                toggleLike={toggleLike}
                                toggleSave={toggleSave}
                            />
                        </div>
                    ))} */}
                    {/* TODO add message if no content and no retries */}
                </>
            }
        </div>
    )
}