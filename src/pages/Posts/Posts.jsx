import { useSelector } from "react-redux"
import { detailData } from "../../app/slices/detailSlice"
import { timeSince } from "../../utils/timeSince"

export const Posts = () => {
    const rdxDetails = useSelector(detailData);
    console.log(rdxDetails);
    return (
        rdxDetails.details.map((post) => (
            <div key={post._id} className="timeline-posts">
                <div className="timeline-post">
                    <div className="timeline-post-header">
                        <div className="timeline-post-author-img">
                            <img src={post.author.profilePicture} alt="author image" />
                        </div>
                        <div className="timeline-post-header-author-info">
                            <div>{post.author.userName}</div>
                            <div>{post.author.userHandle}</div>
                        </div>
                        <div>{timeSince(new Date(post.createdAt))}</div>
                    </div>
                    <div className="timeline-post-img">
                        <img src={post.image} alt="post" />
                    </div>
                    <p>{post.caption}</p>
                    <div>{post.tags}</div>
                    <div className="timeline-post-interactions">
                        <div>{post.likes.length}</div>
                        <div>likes</div>
                        <div>comments</div>
                    </div>
                </div>
            </div>
        ))
    )
}