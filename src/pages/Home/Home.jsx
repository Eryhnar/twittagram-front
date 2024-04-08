import "./Home.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { TimedPopupMsg } from "../../common/TimedPopupMsg/TimedPopupMsg";
import { useState, useEffect } from "react";

export const Home = () => {
    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token;
    const [errorMsg, setErrorMsg] = useState({
        message: "",
        success: false
    });
    const [retries, setRetries] = useState(3);
    const [isLoading, setIsLoading] = useState(true);

    // const getTimeline = async () => {
    //     try {
    //         const response = await getTimelineService(token);
    //         console.log(response);
    //     } catch (error) {
    //         if (retries > 0) {
    //             setRetries(prevState => prevState - 1);
    //             getTimeline();
    //         } else {
    //             setErrorMsg({message: error.message, success: false});
    //         }
    //     }
    // }

    // (token && retries > 0) && getTimeline();

    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const response = await getTimelineService(token);
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
                        <h1>Welcome {rdxUser.credentials.user.name}</h1>
                    </>
            }
        </div>
    )
}