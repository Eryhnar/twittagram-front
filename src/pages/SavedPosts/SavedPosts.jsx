import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect } from "react";

export const SavedPosts = () => {
    const rdxUser = useSelector(userData);
    const [savedPosts, setSavedPosts] = rdxUser.credentials.user.saved;
    const [retries, setRetries] = useState(3);
    const [errorMsg, setErrorMsg] = useState({
        message: "",
        success: false
    });

    useEffect(() => {
        try {
            
        } catch (error) {
            setErrorMsg({ message: error.message, success: false });
        }
    }, [])

    return (
        <div>
            <h1>Saved Posts</h1>
        </div>
    )
}