const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const isValidEmail = (email) => {
    return emailRegex.test(email);
};

export default isValidEmail;
