import { useState } from 'react';
import "./InfoButton.css";

export const InfoButton = ({ className, title, info }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [showHoverInfo, setShowHoverInfo] = useState(false);

    const handleClick = () => {
        setShowInfo(!showInfo);
    }

    return (
        <div 
        className={className || "default-info-button"} 
        onClick={handleClick}
        // onTouchStart={handleClick}
        onMouseEnter={() => setShowHoverInfo(true)}
        onMouseLeave={() => setShowHoverInfo(false)}
        >
            {title || "i"}
            {showInfo || showHoverInfo && <div className="info-button-info">{info || "This is an info button"}</div>}
        </div>
    )
}