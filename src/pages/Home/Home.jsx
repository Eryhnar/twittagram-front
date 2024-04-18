import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, userData } from "../../app/slices/userSlice";
import { TimedPopupMsg } from "../../common/TimedPopupMsg/TimedPopupMsg";
import { useState, useEffect } from "react";
import { getTimelineService, toggleLikeService, toggleSaveService } from "../../services/apiCalls";
import { detailData, saveDetails } from "../../app/slices/detailSlice";
import { useNavigate } from "react-router-dom";
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

    const toggleLike = async (post) => {
        try {
            const response = await toggleLikeService(token, post._id);
                setTimeline(timeline.map(item => 
                    item._id === post._id 
                        ? {
                            ...item, 
                            likes: response.data.likes
                        } 
                        : item
                ));
        } catch (error) {
            setErrorMsg({ message: error.message, success: false });
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
                </>
            }
        </div>
    )
}