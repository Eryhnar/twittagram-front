import { CButton } from "../../common/CButton/CButton";
import "./Admin.css"
import { useEffect, useState } from "react";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { getCommentsService, getPostsService, getUsersService } from "../../services/apiCalls";
import { CTable } from "../../common/CTable/CTable";

export const Admin = () => {
    const [data, setData] = useState([]);
    const [dataType, setDataType] = useState("");
    const [errorMsg, setErrorMsg] = useState({
        message: "",
        success: false
    });
    const [retries, setRetries] = useState(3);
    const [isLoading, setIsLoading] = useState(false);

    const rdxUser = useSelector(userData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getData(dataType);
                setData(response.data);
                setRetries(3);
                setIsLoading(false);
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

    const getData = (dataType) => {
        switch (dataType) {
            case "users":
                return getUsersService(rdxUser.credentials.token);
            case "posts":
                return getPostsService(rdxUser.credentials.token);
            case "comments":
                return getCommentsService(rdxUser.credentials.token);
            default:
                return { data: [] };
        }
    }

    const saveChanges = async () => {
        try {
            console.log("saving changes");
        } catch (error) {
            setErrorMsg({ message: error.message, success: false });
        }
    }

    const deleteEntry = async () => {
        try {
            console.log("deleting data");
        } catch (error) {
            setErrorMsg({ message: error.message, success: false });
        }
    }

    return (
        <div className="admin-design">
            <div className="admin-filter-header">
                <CButton
                    className="admin-filter-button"
                    title="Users"
                    onClickFunction={() => {
                        setDataType("users")
                        setIsLoading(true)
                    }}
                />
                <CButton
                    className="admin-filter-button"
                    title="Posts"
                    onClickFunction={() => {
                        setDataType("posts")
                        setIsLoading(true)
                    }}
                />
                <CButton
                    className="admin-filter-button"
                    title="Comments"
                    onClickFunction={() => {
                        setDataType("comments")
                        setIsLoading(true)
                    }}
                />
            </div>
            {isLoading
            ?
            <h1>Loading...</h1>
            :
                data.length > 0 
                    ?
                    <div className="admin-table">
                        <CTable
                            data={data}
                            saveChanges={saveChanges}
                            deleteEntry={deleteEntry}
                        />
                    </div>
                :
                <h1>No data available</h1>
                
            }
        </div>
    )
}