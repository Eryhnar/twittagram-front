import { useState, useEffect } from 'react';
import { Virtuoso } from "react-virtuoso";
import "./CommentsPopup.css";
import { timeSince } from '../../utils/timeSince';

export const CommentsPopup = ({ postId, closePopup, fetchComments }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchAndSetComments = async () => {
            console.log(postId);
            const fetchedComments = await fetchComments(postId);
            console.log(fetchedComments);
            setComments(fetchedComments);
        };

        fetchAndSetComments();
    }, [postId, fetchComments]);

    return (
        <div className="comments-popup">
            <div className="comments-popup-header">
                {/* <h1>Comments</h1> */}
                <div onClick={closePopup}><span className="material-symbols-outlined">close</span></div>
            </div>
            <div className="comments-popup-body">
                {console.log(comments)}
                {comments.map(comment => 
                    <div className="comment">
                        <div className="comment-author-info">
                            {/* <div>{comment.author.userName}</div> */}
                            {/* <div>{comment.author.userHandle}</div> */}
                        </div>
                        <div className="comment-time">{timeSince(new Date(comment.createdAt))}</div>
                        <h1>{comment.author.userName}</h1>
                        <h2>{comment.author.userHandle}</h2>
                        <div className="comment-text">{comment.content}</div>
                    </div>
                )}
                {/* <Virtuoso
                    style={{ height: "100%", width: "100%" }}
                    data={comments}
                    itemContent={(index, comment) => (
                        // <CCard 
                        //     title={comment.author.userName}
                        //     content={comment.text}
                        // />
                        <div className="comment">
                            <div className="comment-author-info">
                                <div>{comment.author.userName}</div>
                                <div>{comment.author.userHandle}</div>
                            </div>
                            <div className="comment-time">{timeSince(new Date(comment.createdAt))}</div>
                            <div className="comment-text">{comment.text}</div>
                        </div>
                    )}
                <div>{comment.content}</div>
                {/* <Virtuoso
                    style={{ height: "100%", width: "100%" }}
                    data={comments}
                    itemContent={(index, comment) => (
                        // <CCard 
                        //     title={comment.author.userName}
                        //     content={comment.text}
                        // />
                        <div className="comment">
                            <div className="comment-author-info">
                                <div>{comment.author.userName}</div>
                                <div>{comment.author.userHandle}</div>
                            </div>
                            <div className="comment-time">{timeSince(new Date(comment.createdAt))}</div>
                            <div className="comment-text">{comment.text}</div>
                        </div>
                    )}
                /> */}
                {/* <Virtuoso
                        data={comments}
                        itemContent={(_, ) => (
                            <div className="comment">
                                <div className="comment-author-info">
                                    <div>comment.author.userName</div>
                                    <div>comment.author.userHandle</div>
                                </div>
                                <div className="comment-time">timeSince(new Date(comment.createdAt))</div>
                                <div className="comment-text">comment.text</div>
                            </div>
                        )}
                        style={{height: "90vh"}}
                        // endReached={async () => {
                        //     try {
                        //         const response = await getTimelineService(token, page + 1);
                        //         if (response.data.length > 0) {
                        //             setTimeline(prevTimeline => [...prevTimeline, ...response.data]);
                        //             setPage(prevPage => prevPage + 1);
                        //             setRetries(3);
                        //         }
                        //     } catch (error) {
                        //         if (retries > 0) {
                        //             setRetries(prevRetries => prevRetries - 1);
                        //         } else {
                        //             setErrorMsg({ message: error.message, success: false });
                        //         }
                        //     }
                        // }}
                    /> */}
            </div>
        </div>
    )
}