import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { TimedPopupMsg } from "../../common/TimedPopupMsg/TimedPopupMsg";
import { useState, useEffect } from "react";
import { getTimelineService, toggleLikeService } from "../../services/apiCalls";
import { detailData, saveDetails } from "../../app/slices/detailSlice";
import { useNavigate } from "react-router-dom";
import { timeSince } from "../../utils/timeSince";

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

    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const response = await getTimelineService(token);
                setTimeline(response.data);
                console.log(response);
            } catch (error) {
                if (retries > 0) {
                    setRetries(prevState => prevState - 1);
                } else {
                    setErrorMsg({ message: error.message, success: false });
                }
            }
        }
        token && retries > 0 ? fetchTimeline() : setIsLoading(false);
        // if (token && retries > 0) {
        //     fetchTimeline();
        // } else {
        //     setIsLoading(false);
        // }
    }, [retries])

    const toggleLike = async (post) => {
        // console.log(post._id);
        try {
            const response = await toggleLikeService(token, post._id);
            // console.log(response);
                // console.log(post.likes);
                setTimeline(timeline.map(item => 
                    item._id === post._id 
                        ? {...item, likes: post.likes.includes(rdxUser.credentials.user.id) 
                            ? item.likes.filter(id => id !== rdxUser.credentials.user.id) 
                            : [...item.likes, rdxUser.credentials.user.id]
                        } 
                        : item
                ));
                // console.log(post.likes);
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
                <h1>Home</h1>

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
                    {timeline.length > 0 && timeline.map((post) => (
                        <div className="timeline-posts" key={post._id}>
                            <div className="timeline-post">
                            {/* <div key={post._id} className="post" onClick={() => {
                                console.log(post);
                                dispatch(saveDetails({ details: post }));
                            }}> */}
                                {/* <h3>{post.author.userName}</h3> */}
                                <div className="timeline-post-header">
                                    <div className="timeline-post-author-img" onClick={() => {
                                        dispatch(saveDetails( post.author ))
                                        navigate("/profile");
                                    }}>
                                        <img src={post.author.profilePicture} alt="author image" />
                                    </div>
                                        {/* {post.author.profilePicture}</div> */}
                            
                                    <div className="timeline-post-header-author-info">
                                        <div onClick={() => {
                                            dispatch(saveDetails( post.author ))
                                            navigate("/profile");
                                        }}>{post.author.userName}</div>
                                        <div>{post.author.userHandle}</div>
                                    </div>
                                    {/* <div>{post.createdAt}</div> */}
                                    <div>{timeSince(new Date(post.createdAt))}</div>
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
                                    dispatch(saveDetails( post ))
                                }}>
                                    <img src={post.image} alt="post" />
                                </div>
                                <p>{post.caption}</p>
                                <div>{post.tags}</div>
                                <div className="timeline-post-interactions-container">
                                    <div className="post-interaction-buttons">
                                        <div onClick={()=> toggleLike(post)}><span className={`material-symbols-outlined ${post.likes.includes(rdxUser.credentials.user.id) ? "favorited" : null}`} /*TODO style here*/ >favorite</span></div>
                                        <div><span className="material-symbols-outlined">add_comment</span></div>
                                        <div><span className="material-symbols-outlined">bookmark</span></div>
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
                        </div>
                    ))}
                </>
            }
        </div>
    )
}