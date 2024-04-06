import { useNavigate } from "react-router-dom";
import "./NavButton.css";

export const NavButton = ({ className, title, path }) => {

    const navigate = useNavigate();

    return (
        <div className={className || "default-nav-button"} onClick={() => navigate(path)}>
            {title}
        </div>
    )
}