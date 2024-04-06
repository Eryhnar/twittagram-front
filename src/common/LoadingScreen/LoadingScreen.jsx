import "./LoadingScreen.css";

export const LoadingScreen = (fullScreen) => {
    return (
        <div className={fullScreen ?"loading-full-screen" : "loading-screen-modal"}>
                <div className="loading-screen-spinner"></div>
        </div>
    )
}