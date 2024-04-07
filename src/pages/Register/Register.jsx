import "./Register.css";
import { CCard } from "../../common/CCard/CCard";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { NavButton } from "../../common/NavButton/NavButton";
import { useState } from "react";
import { RegisterService } from "../../services/apiCalls";

export const Register = () => {

    const [user, setUser] = useState({
        userName: "",
        email: "",
        password: ""
    });
    const [msgError, setMsgError] = useState("");

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const registerUser = async () => {
        try {
            const response = await RegisterService(user);
            setMsgError(response.message);

            // navigate("/login");
        } catch (error) {
            // console.log(error.message);
            setMsgError(error.message);
        }
        // console.log("Registering user");
    }

    return (
        <div className="register-design">
            {/* <div className="register-title">
                Register
            </div>
            <div className="input-field">
                
            </div>
            <div className="input-field"></div>
            <div className="input-field"></div>
            <div className="input-field"></div> */}
            <CCard
                className="register-card"
                title="Register"
                content={
                    <div className="register-inputs">
                        <div className="register-field">
                            <div className="register-input-area">
                                <p>Handle</p>
                                <CInput
                                    className="register-input"
                                    type="name"
                                    placeholder="John"
                                    name="userName"
                                    disabled=""
                                    value={user.userName || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="register-field-error">This is the public userhandle "@johndoe"</div>

                        </div>
                        <div className="register-field">
                            <div className="register-input-area">
                                <p>Email</p>
                                <CInput
                                    className="register-input"
                                    type="email"
                                    placeholder="user@domain.com"
                                    name="email"
                                    disabled=""
                                    value={user.email || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="register-field-error">hi</div>
                        </div>
                        <div className="register-field">
                            <div className="register-input-area">
                                <p>Password</p>
                                <CInput
                                    className="register-input"
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    disabled=""
                                    value={user.password || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="register-field-error">hi</div>
                        </div>
                        <CButton
                            className="register-button"
                            title="Register"
                            onClickFunction={registerUser}
                        />
                        <div className="register-msg">{msgError}</div>
                        <NavButton
                            className="login-redirect"
                            title="Already registered? Click here to log in!"
                            path="/login"
                        />
                        {/* <div>{msgError}</div> */}
                    </div>
                }
            />

        </div>
    )
}