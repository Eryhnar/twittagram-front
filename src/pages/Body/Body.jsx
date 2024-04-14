import {Route, Routes, Navigate} from 'react-router-dom';
import { SecureRoute } from '../../common/SecureRoute/SecureRoute';
import { Home } from '../Home/Home';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';
import { Admin } from '../Admin/Admin';
import { Posts } from '../Posts/Posts';
import { CreatePost } from '../CreatePost/CreatePost';
import { UpdateProfile } from '../UpdateProfile/UpdateProfile';
import { EditPost } from '../EditPost/EditPost';
import { SavedPosts } from '../SavedPosts/SavedPosts';

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
            {/* <Route path="/:user/posts" element={<SecureRoute protMode="allow-logged-in" />}>
                <Route index element={<Posts />} />
            </Route> */}
            <Route path="/create-post" element={<SecureRoute protMode="allow-logged-in" />}>
                <Route index element={<CreatePost />} />
            </Route>
            <Route path="/:user/posts" element={<Posts />}/>
            <Route path="/update-profile" element={<SecureRoute protMode="allow-logged-in" />}>
                <Route index element={<UpdateProfile />} />
            </Route>
            <Route path="/edit-post" element={<SecureRoute protMode="allow-logged-in" />}>
                <Route index element={<EditPost />} />
            </Route>
            <Route path="/saved" element={<SecureRoute protMode="allow-logged-in" />}>
                <Route index element={<SavedPosts />} />
            </Route>
            <Route path="*" element={<Navigate to={"/"} replace/>} />
        </Routes>
        
    )
}