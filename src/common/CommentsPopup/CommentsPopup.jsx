import "./CommentsPopup.css";

export const CommentsPopup = ({ postId, closePopup, fetchComments }) => {
    return (
        <div className="comments-popup">
            <div className="comments-popup-header">
                <h1>Comments</h1>
                <div onClick={closePopup}><span className="material-symbols-outlined">close</span></div>
            </div>
            <div className="comments-popup-body">
                {/* <h1>Comments</h1> */}
            </div>
        </div>
    )
}