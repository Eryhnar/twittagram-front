import { NavButton } from "../NavButton/NavButton";
import "./Header.css";

export const Header = () => {
    return (
        <div className="header-design">
            {/* <div className="header-title"> */}
                <NavButton
                    title="Twittagram"
                    path="/"
                />
                <NavButton
                    title={"Register"} 
                    path="/register"
                />
                <NavButton
                    title={"Login"}
                    path="/login"
                />
            {/* </div> */}
        </div>
    )
}