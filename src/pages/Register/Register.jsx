import "./Register.css";
import { CCard } from "../../common/CCard/CCard";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { NavButton } from "../../common/NavButton/NavButton";
import { useState } from "react";
import { RegisterService } from "../../services/apiCalls";
import { validateEmail, validatePassword, validateUserHandle } from "../../utils/validateRegister";
import { InfoButton } from "../../common/InfoButton/InfoButton";
import { TimedPopupMsg } from "../../common/TimedPopupMsg/TimedPopupMsg";

export const Register = () => {

    const [user, setUser] = useState({
        userName: "",
        email: "",
        password: ""
    });
    const [errorMsg, setErrorMsg] = useState({
        userNameError: "",
        emailError: "",
        passwordError: "",
        serverError: {message: "", success: false}
    });
    const [key, setKey] = useState(0); // I DO NOT LIKE THIS

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const validateInput = (userName, email, password) => {
        return {
            userNameError: validateUserHandle(userName),
            emailError: validateEmail(email),
            passwordError: validatePassword(password)
        };
    }

    const registerUser = async () => {
        try {
            const errors = validateInput(user.userName, user.email, user.password);
            setErrorMsg(prevState => ({
                ...errors,
                serverError: prevState.serverError
            }));

            if (errors.userNameError || errors.emailError || errors.passwordError) {
                return;
            }
            const response = await RegisterService(user);
            setErrorMsg(prevState => ({
                ...prevState,
                serverError: {message: response.message, success: response.success}
            }));
            setKey(prevState => prevState + 1);
        } catch (error) {
            setErrorMsg(prevState => ({
                ...prevState,
                serverError: {message: error.message, success: false}
            }));
            setKey(prevState => prevState + 1);
        }
    }

    return (
        <div className="register-design">

            <CCard
                className="register-card"
                title="Register"
                content={
                    <div className="register-inputs">
                        <div className="register-field">
                            <div className="register-input-area">
                                <p>Handle</p>
                                <CInput
                                    className={`register-handle-field ${errorMsg.userNameError ? "register-field-error" : ""}`}
                                    type="name"
                                    placeholder="John"
                                    name="userName"
                                    disabled=""
                                    value={user.userName || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                                <div className="info-button-wrapper"><InfoButton/></div>
                            </div>
                            <div className={errorMsg.userNameError ? "register-field-error-msg" : "register-empty-error"}>{errorMsg.userNameError}</div>

                        </div>
                        <div className="register-field">
                            <div className="register-input-area">
                                <p>Email</p>
                                <CInput
                                    className={`register-email-field ${errorMsg.emailError ? "register-field-error" : ""}`}
                                    type="email"
                                    placeholder="user@domain.com"
                                    name="email"
                                    disabled=""
                                    value={user.email || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                                <div className="info-button-wrapper"><InfoButton/></div>
                            </div>
                            <div className={errorMsg.emailError ? "register-field-error-msg" : "register-empty-error"}>{errorMsg.emailError}</div>
                        </div>
                        <div className="register-field">
                            <div className="register-input-area">
                                <p>Password</p>
                                <CInput
                                    className={`register-password-field ${errorMsg.passwordError ? "register-field-error" : ""}`}
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    disabled=""
                                    value={user.password || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                                <div className="info-button-wrapper"><InfoButton/></div>
                            </div>
                            <div className={errorMsg.passwordError ? "register-field-error-msg" : "register-empty-error"}>{errorMsg.passwordError}</div>
                        </div>
                        <CButton
                            className="register-button"
                            title="Register"
                            onClickFunction={registerUser}
                        />
                        <div className="register-redirect-text">

                            Already registered? Click&nbsp; <a href="/login" className="register-redirect-link">here</a> &nbsp;to log in!
                        </div>
                        {errorMsg.serverError.message !== "" && (
                            <TimedPopupMsg 
                                key={key}
                                message={errorMsg.serverError.message} 
                                success={errorMsg.serverError.success} 
                                time={10000}
                                resetServerError={() => setErrorMsg(prevState => ({...prevState, serverError: {message: "", success: false}}))}
                            />
                        )}
                    </div>
                }
            />

        </div>
    )
}