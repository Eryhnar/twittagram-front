import { NavButton } from "../NavButton/NavButton";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { saveDetails } from "../../app/slices/detailSlice";

export const Header = () => {
    const rdxUser = useSelector(userData);
    console.log(rdxUser.credentials);
    const dispatch = useDispatch();
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