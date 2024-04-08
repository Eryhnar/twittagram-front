import "./Login.css";
import { CCard } from "../../common/CCard/CCard";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { TimedPopupMsg } from "../../common/TimedPopupMsg/TimedPopupMsg";
import { useState } from "react";
import { LoginService } from "../../services/apiCalls";
import { validateEmail, validatePassword } from "../../utils/validateLogin";
import { login } from "../../app/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [errorMsg, setErrorMsg] = useState({
        emailError: "",
        passwordError: "", 
        serverError: {message: "", success: false}
    });
    const [key, setKey] = useState(0); // I DO NOT LIKE THIS

    const inputHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const validateInput = (email, password) => {
        return {
            emailError: validateEmail(email),
            passwordError: validatePassword(password)
        };
    }

    const loginUser = async () => {
        try {
            const errors = validateInput(credentials.email, credentials.password);
            setErrorMsg(prevState => ({
                ...errors,
                serverError: prevState.serverError
            }));
            if (errors.emailError) {
                return;
            }
            const response = await LoginService(credentials);
            setErrorMsg(prevState => ({
                ...prevState,
                serverError: {message: response.message, success: response.success}
            }));
            setKey(prevState => prevState + 1);
            console.log(response);
            const userCredentials = {
                user: response.data.user,
                token: response.data.token
            }
            dispatch(login({credentials: {user: userCredentials.user, token: userCredentials.token}}));
        } catch (error) {
            setErrorMsg(prevState => ({
                ...prevState,
                serverError: {message: error.message, success: false}
            }));
            setKey(prevState => prevState + 1);
        }
    }
    return (
        <div className="login-design">
            {errorMsg.serverError.message !== "" && (
                <TimedPopupMsg
                    key={key}
                    message={errorMsg.serverError.message}
                    success={errorMsg.serverError.success}
                    timer={10000}
                    resetServerError={() => setErrorMsg(prevState => ({
                        ...prevState, 
                        serverError: {
                            message: "", 
                            success: false
                        }
                    }))}
                />
            )}
            <CCard
                className={"login-card"}
                title="Login"
                content={
                    <div className="login-inputs">
                        <div className="login-field">
                            <div className="login-input-area">
                                <p>Email</p>
                                <CInput
                                    className={"login-email-field"}
                                    type="email"
                                    placeholder="user@domain.com"
                                    name="email"
                                    disabled=""
                                    value={credentials.email || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className={errorMsg.emailError ? "login-field-error-msg" : "login-empty-error"}>{errorMsg.emailError}</div>
                        </div>
                        <div className="login-field">
                            <div className="login-input-area">
                                <p>Password</p>
                                <CInput
                                    className={"login-password-field"}
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    value={credentials.password || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className={errorMsg.passwordError ? "login-field-error-msg" : "login-empty-error"}>{errorMsg.passwordError}</div>
                        </div>
                        <CButton
                            className={"login-button"}
                            title={"Login"}
                            onClickFunction={loginUser}
                        />
                    </div>
                }
            />   
        </div>
    );
}