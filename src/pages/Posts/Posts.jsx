import { useSelector } from "react-redux"
import { detailData } from "../../app/slices/detailSlice"
import { timeSince } from "../../utils/timeSince"
import { PostCard } from "../../common/PostCard/PostCard";
import { userData } from "../../app/slices/userSlice";

export const Posts = () => {
    // const rdxUser = useSelector(userData);
    const rdxDetails = useSelector(detailData);
    return (
        rdxDetails.details.map((post) => (
            <div key={post._id} className="timeline-posts">
                <PostCard post={post} />
            </div>
        ))
    )
}