import { NavButton } from "../NavButton/NavButton";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";

export const Header = () => {
    const rdxUser = useSelector(userData);
    const dispatch = useDispatch();
    console.log(rdxUser);
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
                        <NavButton
                            title={<img src={rdxUser.credentials.user.picture} alt="profile" className="profile-pic" />}
                            path="/profile"
                        />
                        <NavButton
                            title="Logout"
                            path="/"
                            onClick={() => dispatch(logout())}
                        />
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