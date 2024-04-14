import { NavButton } from "../NavButton/NavButton";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { saveDetails } from "../../app/slices/detailSlice";
import { CButton } from "../CButton/CButton";

export const Header = () => {
    const rdxUser = useSelector(userData);
    const dispatch = useDispatch();

    const createPost = () => {
        console.log("create post");
    }
    return (
        <div className="header-design">
            {/* <div className="header-title"> */}
                <NavButton
                    title="Twittagram"
                    path="/"
                />
                {rdxUser.credentials.token 
                    ? 
                    <>
                        {/* <CButton 
                            className={"header-button"}
                            title={"Post"}
                            onClickFunction={() => createPost()}
                        /> */}
                        <NavButton
                            className={"create-post-navbutton"}
                            // title="+"
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
                                title={<img src={rdxUser.credentials.user.profilePicture} alt="profile" className="profile-pic" />}
                                // onClick={() => dispatch(saveDetails(rdxUser.credentials.user))}
                                path="/profile"
                                // onClick={() => console.log(rdxUser.credentials.user)}
                            />
                        </div>
                        <div onClick={() => dispatch(logout({ credentials: "" }))}>
                            <NavButton
                                title="Logout"
                                path="/"
                                // onClick={() => dispatch(logout())}
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
            {/* </div> */}
        </div>
    )
}