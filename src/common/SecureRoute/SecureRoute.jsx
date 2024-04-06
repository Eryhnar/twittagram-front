import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { TokenContext } from '../../App';

export const SecureRoute = ({ protMode }) => {
    const { token, setToken } = React.useContext(TokenContext);
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
                if (!token || !token.roleName.includes("admin")) navigate("/");
                break;
            default:
                navigate("/");
        }
    }, [protMode, token, navigate]);

    return <Outlet />;
}