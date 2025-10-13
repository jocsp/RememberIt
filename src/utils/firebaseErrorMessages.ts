type ErrorMessage = {
    [key: string]: string;
};

const errorMessages: ErrorMessage = {
    "auth/invalid-credential": "Email or password is incorrect",
    "auth/invalid-email": "Invalid email, please input a valid email",
};

const getErrorMessage = (errorCode: string): string => {
    let message = errorMessages[errorCode];

    if (!message) {
        message = "An unexpected error occurred. Please try again";
        console.log("Error Code: " + errorCode);
    }

    return message;
};

export { getErrorMessage };
