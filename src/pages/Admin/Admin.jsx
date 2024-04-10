import { CButton } from "../../common/CButton/CButton";
import "./Admin.css"
import { useEffect, useState } from "react";

export const Admin = () => {
    const [data, setData] = useState([]);
    const [dataType, setDataType] = useState("");
    const [errorMsg, setErrorMsg] = useState({
        message: "",
        success: false
    });
    const [retries, setRetries] = useState(3);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getData(dataType);
                setData(response.data);
                // setDataType("");
                setRetries(3);
                setIsLoading(false);
                console.log(response.data);
            } catch (error) {
                if (retries > 0) {
                    setRetries(prevState => prevState - 1);
                } else {
                    setErrorMsg({ message: error.message, success: false });
                    setIsLoading(false);
                }
            }
        }
        isLoading && retries > 0 ? fetchData() : setIsLoading(false);
    }, [retries, isLoading]);
    //     dataType !== "" && retries > 0 ? fetchData() : setIsLoading(false);
    // }, [retries, dataType]);

    const getData = (dataType) => {
        switch (dataType) {
            case "users":
                return getUsersService();
            case "posts":
                return getPostsService();
            case "comments":
                return getCommentsService();
            default:
                return { data: [] };
        }
    }

    return (
        <div className="admin-design">
            <CButton
                className="admin-fetch-filter"
                title="Users"
                onClick={() => setDataType("users")}
            />
            <CButton
                className="admin-fetch-filter"
                title="Posts"
                onClick={() => setDataType("posts")}
            />
            <CButton
                className="admin-fetch-filter"
                title="Comments"
                onClick={() => setDataType("comments")}
            />
            <h1>Admin Page</h1>
        </div>
    )
}