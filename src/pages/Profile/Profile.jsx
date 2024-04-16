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
        const fetchProfile = async () => {
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
    }, [retries, rdxDetail.details.userHandle])

    const toggleFriend = async (id) => {
        try {
            const response = await toggleFriendService(rdxUser.credentials.token, id);
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
            const response = await toggleFollowService(rdxUser.credentials.token, id);
            dispatch(updateUser({
                user: {
                    ...rdxUser.credentials.user,
                    following: response.data.following
                }
            }));
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
                         <img 
                            src={profile.profilePicture} 
                            onError={(e) => {e.target.onerror = null; e.target.src="../../../public/Missing_avatar.svg"}}
                            alt="profile image" 
                        />
                    </div>
                    <div className="profile-info-text-area">
                        <h1>{profile.userName}</h1>
                        <h3>{profile.userHandle}</h3>
                        <p>{profile.bio}</p>
                        <div className="profile-metrics">
                            <p>{profile.followers.length}Followers</p>
                            <p>{profile.following.length}Following</p>
                        </div>
                        <div className="profile-interactions">
                            {rdxUser.credentials.user.userHandle == profile.userHandle
                                ?
                                <>
                                    <div onClick={() => navigate("/update-profile")}>Edit Profile</div>
                                    <div onClick={() => navigate("/saved")}>Saved Posts</div>
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
                                dispatch(saveDetails({
                                    posts: profile.posts,
                                    clickedPost: post._id
                                })) //TODO pass only profile._id as author id and refetch posts
                                navigate(`/${profile.userHandle}/posts`)
                            }}>
                                <img 
                                    src={post.image} 
                                    onError={(e) => {e.target.onerror = null; e.target.src="../../../public/missing_post.jpg"}}
                                    alt="post image" 
                                />
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