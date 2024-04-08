import "./Home.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";

export const Home = () => {
    const rdxUser = useSelector(userData);
    return (
        <div className="home-container">
            {!rdxUser.credentials.token 
                ?
                    <h1>Home</h1>

                :
                    <h1>Welcome {rdxUser.credentials.user.name}</h1>
            }
        </div>
    )
}