import "./Profile.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { detailData } from "../../app/slices/detailSlice";
import { userData } from "../../app/slices/userSlice";
import { getProfileService } from "../../services/apiCalls";

export const Profile = () => {
    const rdxDetail = useSelector(detailData);
    const rdxUser = useSelector(userData);

    useEffect(() => {
        console.log(rdxDetail);
        getProfileService(rdxUser.credentials.token, rdxDetail.details.userHandle)
    })

    return (

        
        <div className="profile-container">
            <h1>Profile</h1>
        </div>
    )
}