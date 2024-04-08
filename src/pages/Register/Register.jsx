import "./Register.css";
import { CCard } from "../../common/CCard/CCard";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { NavButton } from "../../common/NavButton/NavButton";
import { useState } from "react";
import { RegisterService } from "../../services/apiCalls";
import { validateEmail, validatePassword, validateUserHandle } from "../../utils/validateRegister";
import { InfoButton } from "../../common/InfoButton/InfoButton";

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
        serverError: ""
    });

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const validateInput = (userName, email, password) => {
        // if (userName === "" || email === "" || password === "") {
        //     setErrorMsg(prevState => ({
        //         ...prevState,
        //         userNameError: "Field is required",
        //         emailError: "Field is required",
        //         passwordError: "Field is required"
        //     }));
        // }
        // processHandle(userName)
        // if (!isValidHandle(userName)) {
        //     setErrorMsg(prevState => ({
        //         ...prevState,
        //         userNameError: "Invalid handle"
        //     }));
        // };


        // setErrorMsg(prevState => ({
        //     ...prevState,
        //     userNameError: validateUserHandle(userName),
        //     emailError: validateEmail(email),
        //     passwordError: validatePassword(password)
        // }));
        return {
            userNameError: validateUserHandle(userName),
            emailError: validateEmail(email),
            passwordError: validatePassword(password)
        };
    }

    const registerUser = async () => {
        try {
            // validateInput(user.userName, user.email, user.password);
            // if (errorMsg.userNameError !== "" || errorMsg.emailError !== "" || errorMsg.passwordError !== "") {
            //     return;
            // }

            const errors = validateInput(user.userName, user.email, user.password);
            setErrorMsg(errors);

            if (errors.userNameError || errors.emailError || errors.passwordError) {
                return;
            }

            const response = await RegisterService(user);
            setErrorMsg(prevState => ({
                ...prevState,
                serverError: response.message
            }));

            // navigate("/login");
        } catch (error) {
            // console.log(error.message);
            setErrorMsg(prevState => ({
                ...prevState,
                serverError: error.message
            }));
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
                            {/* <div className="register-field-error">hi</div> */}
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
                        <div className="register-msg">{errorMsg.serverError}</div>
                        <div className="register-redirect-text">
                            {/* Already registered? Click{" "}

                        <NavButton
                            className="register-redirect-link"
                            title="here"
                            path="/login"
                        />
                            &nbsp;to log in! */}
                            Already registered? Click&nbsp; <a href="/login" className="register-redirect-link">here</a> &nbsp;to log in!
                        </div>
                        {/* <div>{msgError}</div> */}
                    </div>
                }
            />

        </div>
    )
}