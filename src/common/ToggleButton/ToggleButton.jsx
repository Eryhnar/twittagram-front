import "./ToggleButton.css";
import { useState } from "react";

export const ToggleButton = ({ railClass, indicatorClass, activeRailClass, activeIndicatorClass, onClick }) => {
    const [isActive, setIsActive] = useState(false);

    const toggleState = () => {
        setIsActive(!isActive);
    }

    return (
        <div className={isActive ? `${activeRailClass || "default-toggle-rail-active"}` : `${railClass || "default-toggle-rail"}`} onClick={onClick || toggleState }>
            <div className={isActive ? `${activeIndicatorClass || "default-indicator-button-active"}` : `${indicatorClass || "default-indicator-button"}`}></div>
        </div>
    );
}