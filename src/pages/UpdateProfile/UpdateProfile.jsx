import { useDispatch, useSelector } from "react-redux";
import { updateUser, userData } from "../../app/slices/userSlice";
import { CButton } from "../../common/CButton/CButton"
import { CInput } from "../../common/CInput/CInput"
import { useState } from "react";
import { TimedPopupMsg } from "../../common/TimedPopupMsg/TimedPopupMsg";
import { changePasswordService, suspendAccountService, updateProfileService } from "../../services/apiCalls";
import { CCard } from "../../common/CCard/CCard";
import { logout } from "../../app/slices/userSlice";
import "./UpdateProfile.css"
import { useNavigate } from "react-router-dom";
import isValidPassword from "../../utils/isValidPassword";
import { UploadWidget } from "../../common/UploadWidget/UploadWidget";

export const UpdateProfile = () => {
    const rdxUser = useSelector(userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [updatedProfile, setUpdatedProfile] = useState({
        userName: rdxUser.credentials.user.userName,
        bio: rdxUser.credentials.user.bio,
        // profilePicture: rdxUser.credentials.user.profilePicture
        profilePicture: rdxUser.credentials.user.profilePicture
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
    const [isOpenPassword, setIsOpenPassword] = useState(false);
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const inputHandler = (e) => {
        setUpdatedProfile((prevState) => ({
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

    const passwordInputHandler = (e) => {
        setPassword((prevState) => ({
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
            setErrorMsg({
                message: response.message,
                success: true
            });
        } catch (error) {
            setErrorMsg({ 
                message: error.message, 
                success: false 
            });
            setPopupCounter(prevState => prevState + 1);
        }
    }

    const verifyPasswordMatch = (password1, password2) => {
        return password1 === password2;
    }

    const validatePasswords = (passwords) => {
        for (let i in passwords) {
            if (!isValidPassword(passwords[i])) {
                return false;
            }
        }
        return true;
    }

    const suspendAccount = async () => { 
        try {
            if (!verifyPassword(suspendCredentials.password, suspendCredentials.confirmPassword)) { // NOT needed
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



    const changePassword = async () => {
        console.log(password);
        try {
            if (password.newPassword !== password.confirmPassword) { 
                throw new Error("Passwords do not match");
            }
            if (!validatePasswords(password)) {
                throw new Error("Password does not meet requirements");
            }
            const response = await changePasswordService(rdxUser.credentials.token, password);
            setErrorMsg({
                message: response.message,
                success: true
            });
            console.log(response);
        } catch (error) {
            setErrorMsg({ 
                message: error.message, 
                success: false 
            });
            setPopupCounter(prevState => prevState + 1);
        }
    }

    const constructImageURL = (publicId, fileExtension) => {
        // const url = `https://res.cloudinary.com/dib7jxktr/image/upload/${publicId}.${fileExtension}`
        setUpdatedProfile({
            ...updatedProfile,
            profilePicture: `https://res.cloudinary.com/dib7jxktr/image/upload/${publicId}.${fileExtension}`
        })
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
            <img src={updatedProfile.profilePicture} alt="not found" />
            <UploadWidget 
                onUploadSuccess={constructImageURL}
            />
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
                onClickFunction={() => setIsOpenPassword(true)}
            />
            <CCard
                className={isOpenPassword ? "change-password-card" : "change-password-card-hidden"}
                title=""
                content={
                    <div>
                        <div>
                            <p>Old Password</p>
                            <CInput
                                className="change-password-input"
                                type="password"
                                placeholder="Old Password"
                                name="oldPassword"
                                value={password.oldPassword || ""}
                                onChangeFunction={(e) => passwordInputHandler(e)}
                            />
                        </div>
                        <div>
                            <p>New Password</p>
                            <CInput
                                className="change-password-input"
                                type="password"
                                placeholder="New Password"
                                name="newPassword"
                                value={password.newPassword || ""}
                                onChangeFunction={(e) => passwordInputHandler(e)}
                            />
                        </div>
                        <div>
                            <p>Confirm Password</p>
                            <CInput
                                className="change-password-input"
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={password.confirmPassword || ""}
                                onChangeFunction={(e) => passwordInputHandler(e)}
                            />
                        </div>
                        <CButton
                            className="change-password-button"
                            title="Change Password"
                            onClickFunction={changePassword}
                        />
                        <CButton
                            className="change-password-button"
                            title="Cancel"
                            onClickFunction={() => {
                                setIsOpenPassword(false)
                                setPassword({
                                    oldPassword: "",
                                    newPassword: "",
                                    confirmPassword: ""
                                });
                            }}
                        />
                    </div>
                }
                image=""
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