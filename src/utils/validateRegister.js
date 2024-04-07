import { isValidHandle, processHandle } from "./isValidHandle";
import isValidEmail  from "./isValidEmail";
import isValidPassword  from "./isValidPassword";

export const validateUserHandle = (handle) => {
    if (handle === "") {
        return "Handle cannot be empty";
    }
    const processedHandle = processHandle(handle);
    if (!isValidHandle(processedHandle)) {
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
