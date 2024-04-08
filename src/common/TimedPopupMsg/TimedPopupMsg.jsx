import "./TimedPopupMsg.css";
import { useState, useEffect } from "react";

export const TimedPopupMsg = ({ message, success, time }) => {
    const [isOpened, setIsOpened] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsOpened(false);
        }, time || 4000);
    })
    "popup-timer-bar"
    return (
        isOpened && (
            <div className="timed-popup">
                <p>{message}</p>
                <div className="popup-timer-wrapper">
                    <div 
                        className={success ? "popup-timer-bar-success" : "popup-timer-bar-failure"} 
                        style={{ animationDuration: `${time || 4000}ms`}}>
                    </div>
                </div>
            </div>
        )
    );
}