import "./Profile.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailData, saveDetails } from "../../app/slices/detailSlice";
import { userData } from "../../app/slices/userSlice";
import { getProfileService, toggleFollowService, toggleFriendService } from "../../services/apiCalls";
import { TimedPopupMsg } from "../../common/TimedPopupMsg/TimedPopupMsg";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../app/slices/userSlice";

export const Profile = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
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
        // console.log(rdxUser);
        // console.log(rdxDetail.details.userHandle);
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

    const toggleFriend = async (id) => {
        try {
            const response = await toggleFriendService(rdxUser.credentials.token, id);
            // console.log(response);
            dispatch(updateUser({
                user: {
                    ...rdxUser.credentials.user,
                    friends: response.data.friends
                }
            }));
        } catch (error) {
            setErrorMsg({ message: error.message, success: false });
        }
    }

    const toggleFollow = async (id) => {
        try {
            console.log("hi");
            const response = await toggleFollowService(rdxUser.credentials.token, id);
            console.log(response);
            dispatch(updateUser({
                user: {
                    ...rdxUser.credentials.user,
                    following: response.data.following
                }
            }));
            console.log(rdxUser.credentials.user);
            setProfile({
                ...profile,
                followers: profile.followers.includes(rdxUser.credentials.user.id) 
                    ? profile.followers.filter(id => id !== rdxUser.credentials.user.id) 
                    : [...profile.followers, rdxUser.credentials.user.id]
            })
        } catch (error) {
            setErrorMsg({ message: error.message, success: false });
        }
    }

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
                        {/* {console.log(profile)} */}
                        <p>{profile.bio}</p>
                        <div className="profile-interactions">
                            {rdxUser.credentials.user.userHandle == profile.userHandle
                                ?
                                <>
                                    <div onClick={() => navigate("/update-profile")}>Edit Profile</div>
                                    <div onClick={() => navigate("/saved")}>Saved</div>
                                </>
                                :
                                <>
                                    <div onClick={() => toggleFollow(profile._id)}>{rdxUser.credentials.user.following.includes(profile._id) ? "unfollow" : "follow"}</div>
                                    <div onClick={() => toggleFriend(profile._id)}>{rdxUser.credentials.user.friends.includes(profile._id) ? "remove friend" : "add friend"}</div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="profile-posts-container">
                    {profile.posts.map((post, index) => {
                        return (
                            <div key={index} className="profile-post" onClick={() => {
                                dispatch(saveDetails(profile.posts)) //TODO pass only profile._id as author id and refetch posts
                                // console.log(profile.posts);
                                // console.log(`${profile.userHandle}/posts`);
                                navigate(`/${profile.userHandle}/posts`)
                            }}>
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