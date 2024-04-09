import "./Profile.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { detailData } from "../../app/slices/detailSlice";

export const Profile = () => {
    const rdxDetail = useSelector(detailData);

    useEffect(() => {
        console.log(rdxDetail);
        
    })

    return (

        
        <div className="profile-container">
            <h1>Profile</h1>
        </div>
    )
}