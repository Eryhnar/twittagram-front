import { NavButton } from "../NavButton/NavButton";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { saveDetails } from "../../app/slices/detailSlice";

export const Header = () => {
    const rdxUser = useSelector(userData);
    const dispatch = useDispatch();

    return (
        <div className="header-design">
                <NavButton
                    title="Twittagram"
                    path="/"
                />
                {rdxUser.credentials.token 
                    ? 
                    <>
                        <NavButton
                            className={"create-post-navbutton"}
                            title={<span className="material-symbols-outlined">
                            add
                            </span>}
                            path="/create-post"
                        />
                        {rdxUser.credentials.user.role.includes("admin") &&
                            <NavButton
                                title="Admin"
                                path="/admin"
                            />
                        }
                        <div onClick={() => dispatch(saveDetails(rdxUser.credentials.user))}>
                            <NavButton
                                title={
                                <div className="header-profile-picture-container">
                                    <img 
                                    src={rdxUser.credentials.user.profilePicture} 
                                    onError={(e) => {e.target.onerror = null; e.target.src="../../../public/Missing_avatar.svg"}}
                                    alt="profile image" 
                                    />
                                </div>
                            }
                                path="/profile"
                            />
                        </div>
                        <div onClick={() => dispatch(logout({ credentials: "" }))}>
                            <NavButton
                                title="Logout"
                                path="/"
                            />
                        </div>
                    </>
                    : 
                    <>
                        <NavButton
                            title={"Register"} 
                            path="/register"
                        />
                        <NavButton
                            title={"Login"}
                            path="/login"
                        />
                    </>
                }
        </div>
    )
}