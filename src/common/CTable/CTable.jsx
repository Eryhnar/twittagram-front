import { useEffect, useState } from "react";
import { CInput } from "../CInput/CInput";
import "./CTable.css";

export const CTable = ({ data, saveChanges, deleteEntry }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [originalData, setOriginalData] = useState({});

    console.log("Table data",data);

    const allKeys = [...new Set(data.flatMap(Object.keys))]
    const columns = allKeys.map(key => ({
        Header: key,
        accessor: key 
    }))

    const handleEdit = (entry) => {
        setIsEditing(true);
        setEditedData(entry);
        setOriginalData(entry);
    }

    const cancelEdit = () => {
        setIsEditing(false);
        setEditedData({});
    }
    return (
        <table className="default-custom-table-design">
            <thead>
                <tr>
                    {/* <th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th> */}

                    {columns.map((column) => (
                        <th key={column.accessor}>{column.Header}</th> //no accessor???
                    ))}
                    <th key="button1">save</th>
                    <th key="button2">delete</th>

                </tr>
            </thead>
            <tbody>
                {data.map((entry) => (
                    <tr key={entry._id}>
                        {/* <td>{entry._id}</td>
                        <td>{entry.username}</td>
                        <td>{entry.email}</td>
                        <td>{entry.role}</td> */}
                        {columns.map((column) => (
                            <td key={column.accessor}>
                                <CInput
                                    className={isEditing ? "CTable-input-edit" : "CTable-input"}
                                    type="text"
                                    placeholder={entry[column.accessor] !== undefined ? entry[column.accessor] : "N/A"}
                                    name={column.accessor}
                                    disabled={!isEditing ? "disabled" : ""}
                                    value={isEditing && editedData[column.accessor] !== undefined ? editedData[column.accessor] : entry[column.accessor] || "N/A"}
                                    onChangeFunction={(e) => setEditedData({...editedData, [column.accessor]: e.target.value})}
                                />
                            </td>
                        ))}
                        {/* <td>
                            <CInput
                                className={isEditing ? "CTable-input-edit" : "CTable-input"}
                                type="text"
                                placeholder={field}
                                name={field}
                                disabled={!isEditing ? "disabled" : ""}
                                value={editedData[field] || ""}
                                onChangeFunction={(e) => inputHandler(e)}
                            />
                        </td> */}
                        <td>
                            <button onClick={() => saveChanges(entry)}>Save</button>
                            <button onClick={() => deleteEntry(entry)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}