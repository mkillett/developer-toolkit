function isRequired(value) {
    return typeof value === "string" && value.trim() !== "";
}

function isValidEmail(email) {
    return email.includes("@") && email.includes(".");
}

function isValidPhoneNumber(phoneNumber) {
    return phoneNumber.trim().length >= 10;
}