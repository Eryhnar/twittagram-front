import isValidEmail from "./isValidEmail";

export const validateEmail = (email) => {
    if (email === "") {
        return "Email cannot be empty";
    }
    if (!isValidEmail(email)) {
        return "Invalid Email";
    }
}

export const validatePassword = (password) => {
    if (password === "") {
        return "Password cannot be empty";
    }
}


