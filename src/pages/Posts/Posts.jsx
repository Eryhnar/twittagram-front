import { useSelector } from "react-redux"
import { detailData } from "../../app/slices/detailSlice"
import { timeSince } from "../../utils/timeSince"
import { PostCard } from "../../common/PostCard/PostCard";

export const Posts = () => {
    const rdxDetails = useSelector(detailData);
    console.log(rdxDetails);
    return (
        rdxDetails.details.map((post) => (
            <div key={post._id} className="timeline-posts">
                <PostCard post={post} />
            </div>
        ))
    )
}