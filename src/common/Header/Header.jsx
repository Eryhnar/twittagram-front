import { NavButton } from "../NavButton/NavButton";
import "./Header.css";

export const Header = () => {
    return (
        <div className="header">
            {/* <div className="header-title"> */}
                <NavButton
                    title="Twittagram"
                    path="/"
                />
                <NavButton
                    title={"Register"} path="/register"
                />
            {/* </div> */}
        </div>
    )
}