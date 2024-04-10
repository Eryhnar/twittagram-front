import {Route, Routes, Navigate} from 'react-router-dom';
import { SecureRoute } from '../../common/SecureRoute/SecureRoute';
import { Home } from '../Home/Home';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';
import { Admin } from '../Admin/Admin';

export const Body = () => {
    return (
        
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SecureRoute protMode="allow-logged-out" />}>
                <Route index element={<Login />} />
            </Route>
            {/* <Route path="/login" element={<Login />} /> */}

            <Route path="/register" element={<SecureRoute protMode="allow-logged-out" />}>
                <Route index element={<Register />} />
            </Route>
            {/* <Route path="/register" element={<Register />} /> */}

            <Route path="/profile" element={<SecureRoute protMode="allow-logged-in" />}>
                <Route index element={<Profile />} />
            </Route>
            
            <Route path="/admin" element={<SecureRoute protMode="allow-logged-in-admin" />}>
                <Route index element={<Admin />} />
            </Route>
            {/* <Route path="/catalogue" element={<Catalogue />} /> */}
            <Route path="*" element={<Navigate to={"/"} replace/>} />
        </Routes>
        
    )
}