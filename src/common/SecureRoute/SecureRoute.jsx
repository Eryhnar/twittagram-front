import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userData } from '../../app/slices/userSlice';

export const SecureRoute = ({ protMode }) => {
    const user = useSelector(userData);
    const token = user.credentials.token;
    const navigate = useNavigate();

    useEffect(() => {
        switch (protMode) {
            case 'allow-logged-out':
                if (token) navigate("/");
                break;
            case 'allow-logged-in':
                if (!token) navigate("/");
                break;
            case 'allow-logged-in-admin':
                if (!user || !user.credentials.user.role.includes("admin")) navigate("/");
                break;
            default:
                navigate("/");
        }
    }, [protMode, user, token]);

    return <Outlet />;
}