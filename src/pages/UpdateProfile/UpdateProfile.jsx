import { useDispatch, useSelector } from "react-redux";
import { updateUser, userData } from "../../app/slices/userSlice";
import { CButton } from "../../common/CButton/CButton"
import { CInput } from "../../common/CInput/CInput"
import { useState } from "react";
import { TimedPopupMsg } from "../../common/TimedPopupMsg/TimedPopupMsg";
import { suspendAccountService, updateProfileService } from "../../services/apiCalls";
import { CCard } from "../../common/CCard/CCard";
import { logout } from "../../app/slices/userSlice";
import "./UpdateProfile.css"
import { useNavigate } from "react-router-dom";

export const UpdateProfile = () => {
    const rdxUser = useSelector(userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    const [isOpenSuspend, setIsOpenSuspend] = useState(false);
    const [suspendCredentials, setSuspendCredentials] = useState({
        password: "",
        confirmPassword: ""
    });
    const [popupCounter, setPopupCounter] = useState(0);

    const inputHandler = (e) => {
        setUpdateProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const suspendInputHandler = (e) => {
        setSuspendCredentials((prevState) => ({
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
            setPopupCounter(prevState => prevState + 1);
        }
    }

    const verifyPassword = async () => {
        return suspendCredentials.password === suspendCredentials.confirmPassword;
    }

    const suspendAccount = async () => { 
        try {
            if (!verifyPassword()) {
                throw new Error("Passwords do not match");
            }
            const response = await suspendAccountService(rdxUser.credentials.token, suspendCredentials.password);
            console.log(response);
            dispatch(logout({ credentials: "" }));
        } catch (error) {
            setErrorMsg({ 
                message: error.message, 
                success: false 
            });
            setPopupCounter(prevState => prevState + 1);
        }
    }

    return (
        <div>
            {errorMsg.message && 
                <TimedPopupMsg
                    key={popupCounter}
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
                onClickFunction={() => {navigate("/profile")}}
            />
            <CButton
                className="update-profile-button"
                title="Delete Account"
                onClickFunction={() => setIsOpenSuspend(true)}
            />
            <CCard
                className={isOpenSuspend ? "suspend-account-card" : "suspend-account-card-hidden"}
                title="Suspend Account"
                content={
                    <div>
                        <p>Are you sure you want to delete your account?</p>
                        <CInput
                            className="suspend-account-input"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={suspendCredentials.password || ""}
                            onChangeFunction={(e) => suspendInputHandler(e)}
                        />
                        <CInput
                            className="suspend-account-input"
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={suspendCredentials.confirmPassword || ""}
                            onChangeFunction={(e) => suspendInputHandler(e)}
                        />
                        <CButton
                            className="suspend-account-button"
                            title="Suspend Account"
                            onClickFunction={suspendAccount}
                        />
                        <CButton   
                            className="suspend-account-button"
                            title="Cancel"
                            onClickFunction={() => {
                                setIsOpenSuspend(false)
                                setSuspendCredentials({
                                    password: "",
                                    confirmPassword: ""
                                });
                            }}
                        />
                    </div>
                }
                onClickFunction={suspendAccount}
            />
        </div>
    )
}