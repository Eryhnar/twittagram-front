import { isValidHandle } from "./isValidateHandle";
import { isValidEmail } from "./isValidateEmail";
import { isValidPassword } from "./isValidatePassword";

export const validateUserHandle = (handle) => {
    if (handle === "") {
        return "Handle cannot be empty";
    }
    if (!isValidHandle(handle)) {
        return "Invalid Handle";
    }
    return "";
}

export const validateEmail = (email) => {
    if (email === "") {
        return "Email cannot be empty";
    }
    if (!isValidEmail(email)) {
        return "Invalid Email";
    }
    return "";
}

export const validatePassword = (password) => {
    if (password === "") {
        return "Password cannot be empty";
    }
    if (!isValidPassword(password)) {
        return "Invalid Password";
    }
    return "";
}
