import "./Profile.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { detailData } from "../../app/slices/detailSlice";
import { userData } from "../../app/slices/userSlice";
import { getProfileService } from "../../services/apiCalls";
import { TimedPopupMsg } from "../../common/TimedPopupMsg/TimedPopupMsg";

export const Profile = () => {
    const rdxDetail = useSelector(detailData);
    const rdxUser = useSelector(userData);

    const [profile, setProfile] = useState({});
    const [errorMsg, setErrorMsg] = useState({
        message: "",
        success: false
    });
    const [retries, setRetries] = useState(3);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // console.log(rdxDetail);
        // getProfileService(rdxUser.credentials.token, rdxDetail.details.userHandle)
        const fetchProfile = async () => {
            // console.log(rdxDetail.details);
            // console.log(rdxUser.credentials);
            try {
                const response = await getProfileService(rdxUser.credentials.token, rdxDetail.details.userHandle);
                setProfile(response.data);
                setIsLoading(false);
            } catch (error) {
                if (retries > 0) {
                    setRetries(prevState => prevState - 1);
                } else {
                    setErrorMsg({ message: error.message, success: false });
                }
            }
        }
        rdxUser.credentials.token && retries > 0 ? fetchProfile() : setIsLoading(false);
        // fetchProfile();
    // }, [retries])
    }, [retries, rdxDetail.details.userHandle])

    return (

        <div className="profile-design">
            <TimedPopupMsg
                message={errorMsg.message}
                success={errorMsg.success}
                duration={5000}
                resetServerError={() => setErrorMsg({ message: "", success: false })}
            />
            {!isLoading && profile.userName
            ?
            <>
                <div className="profile-info-area">
                    <div className="profile-picture-container">
                         <img src={profile.profilePicture} alt="" />
                    </div>
                    <div className="profile-info-text-area">
                        {/* <div></div>
                        <div></div> */}
                        <h1>{profile.userName}</h1>
                        <h3>{profile.userHandle}</h3>
                        <div className="profile-metrics">
                            <p>{profile.followers.length}Followers</p>
                            <p>{profile.following.length}Following</p>
                        </div>
                        <p>{profile.bio}</p>
                        <div className="profile-interactions">
                            {rdxUser.credentials.user.userHandle == profile.userHandle
                                ?
                                <div>edit profile</div>
                                :
                                <>
                                    <div>follow</div>
                                    <div>add friend</div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="profile-posts-container">
                    {profile.posts.map((post, index) => {
                        return (
                            <div key={index} className="profile-post">
                                <img src={post.image} alt="" />
                            </div>
                        )
                    })}
                </div>
            </>
            :
            <h1>Profile</h1>
            }
        </div>
    )
}