import { useDispatch, useSelector } from "react-redux";
import { updateUser, userData } from "../../app/slices/userSlice";
import { CButton } from "../../common/CButton/CButton"
import { CInput } from "../../common/CInput/CInput"
import { useState } from "react";
import { TimedPopupMsg } from "../../common/TimedPopupMsg/TimedPopupMsg";
import { updateProfileService } from "../../services/apiCalls";

export const UpdateProfile = () => {
    const rdxUser = useSelector(userData);
    const dispatch = useDispatch();

    const [updatedProfile, setUpdateProfile] = useState({
        userName: rdxUser.credentials.user.userName,
        bio: rdxUser.credentials.user.bio,
        // profilePicture: rdxUser.credentials.user.profilePicture
        profilePicture: "https://upload.wikimedia.org/wikipedia/commons/1/15/Profile_placeholder.png"
    });
    const [errorMsg, setErrorMsg] = useState({
        message: "",
        success: false
    });

    const inputHandler = (e) => {
        setUpdateProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const updateProfile = async () => {
        try {
            console.log(updatedProfile);
            const response = await updateProfileService(rdxUser.credentials.token, updatedProfile);
            console.log(response);
            dispatch(updateUser({
                user: {
                    ...rdxUser.credentials.user,
                    profilePicture: response.data.profilePicture,
                    userName: response.data.userName,
                    bio: response.data.bio
                }
            }));
        } catch (error) {
            setErrorMsg({ 
                message: error.message, 
                success: false 
            });
        }
    }

    return (
        <div>
            {errorMsg.message && 
                <TimedPopupMsg
                    message={errorMsg.message}
                    success={errorMsg.success}
                    time={4000}
                    resetServerError={() => setErrorMsg({ message: "", success: false })}
                />
            }
            <h1>Update Profile</h1>
            <img src={rdxUser.credentials.user.profilePicture} alt="not found" />
            <div>
                <p>name</p>
                <CInput
                    className="update-profile-input"
                    type="text"
                    placeholder="Username"
                    name="userName"
                    value={updatedProfile.userName || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                />
            </div>
            <div>
                <p>bio</p>
                <CInput
                    className="update-profile-input"
                    type="text"
                    placeholder="Bio"
                    name="bio"
                    value={updatedProfile.bio || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                />
            </div>
            <CButton
                className="update-profile-button"
                title="Change Password"
                onClickFunction={() => {}}
            />
            <CButton
                className="update-profile-button"
                title="Save"
                onClickFunction={updateProfile}
            />
            <CButton
                className="update-profile-button"
                title="Cancel"
                onClickFunction={() => {}}
            />
            <CButton
                className="update-profile-button"
                title="Delete Account"
                onClickFunction={() => {}}
            />
        </div>
    )
}