import "./TimedPopupMsg.css";
import { useState, useEffect } from "react";

export const TimedPopupMsg = ({ key, message, success, time, resetServerError}) => {
    const [isOpened, setIsOpened] = useState(true);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsOpened(false);
    //     }, time || 4000);
    // })

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpened(false);
        }, time || 4000);
    
        const resetTimer = setTimeout(() => {
            resetServerError();
        }, time + 1000 || 5000);
    
        return () => {
            clearTimeout(timer);
            clearTimeout(resetTimer); 
        };
    }, [time, resetServerError, message]);

    return (
        isOpened && (
            <div className="timed-popup">
                <p>{message}</p>
                <div className="popup-timer-wrapper">
                    <div 
                        key={key}
                        className={success ? "popup-timer-bar-success" : "popup-timer-bar-failure"} 
                        style={{ animationDuration: `${time || 4000}ms`}}>
                    </div>
                </div>
            </div>
        )
    );
}