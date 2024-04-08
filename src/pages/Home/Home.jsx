import "./Home.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { TimedPopupMsg } from "../../common/TimedPopupMsg/TimedPopupMsg";
import { useState, useEffect } from "react";
import { getTimelineService } from "../../services/apiCalls";

export const Home = () => {
    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token;
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
                    setErrorMsg({message: error.message, success: false});
                }
            }
        }
        if (token && retries > 0) {
            fetchTimeline();
        } else {
            setIsLoading(false);
        }
    }, [retries])

    return (
        <div className="home-container">
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
                            resetError={() => setErrorMsg({message: "", success: false})}
                        />
                    }
                    {timeline.length > 0 && timeline.map((post) => (
                        <div key={post._id} className="post">
                            <h3>{post.author.userName}</h3>
                            {/* <div>{post.author.profilePicture}</div> */}
                            <img src={post.author.profilePicture} alt="author image" />
                            <div>{post.author.userHandle}</div>
                            <div>{post.createdAt}</div>
                            <img src={post.image} alt="post" />
                            <p>{post.caption}</p>
                        </div>
                    ))}
                </>
            }
        </div>
    )
}