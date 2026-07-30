const contactForm = document.querySelector(".contact-form");
const submitButton = document.querySelector("#submit-button");
const successMessage = document.querySelector("#success-message");


const fullNameInput = document.querySelector("#full-name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const companyInput = document.querySelector("#company");
const serviceInput = document.querySelector("#service");
const projectDetailsInput = document.querySelector("#project-details");

const fullNameError = document.querySelector("#full-name-error");
const emailError = document.querySelector("#email-error");
const phoneError = document.querySelector("#phone-error");
const companyError= document.querySelector("#company-error");
const serviceError= document.querySelector("#service-error");
const projectDetailsError= document.querySelector("#project-details-error");



contactForm.addEventListener("submit", handleSubmit);

function clearInputError(input, error) {

    error.textContent = "";
    input.classList.remove("input-error");

}

function clearErrors() {

    fullNameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    companyError.textContent = "";
    serviceError.textContent = "";
    projectDetailsError.textContent = "";

    fullNameInput.classList.remove("input-error");
    emailInput.classList.remove("input-error");
    phoneInput.classList.remove("input-error");
    companyInput.classList.remove("input-error");
    serviceInput.classList.remove("input-error");
    projectDetailsInput.classList.remove("input-error")

}

function handleSubmit(event) {
    event.preventDefault(); 

    
    clearErrors();

const formData = new FormData(contactForm);
const data = Object.fromEntries(formData.entries());

if (!isRequired(data["full-name"])) {
    fullNameError.textContent = "Please enter your full name.";
    fullNameInput.classList.add("input-error");
    return;
}

if (!isValidEmail(data.email)) {
    emailError.textContent = "Please enter a valid email address.";
    emailInput.classList.add("input-error");
    return;
}

if (!isValidPhoneNumber(data.phone)) {
    phoneError.textContent = "Please enter a phone number.";
    phoneInput.classList.add("input-error");
    return;
}

if (!isRequired(data.company)) {
    companyError.textContent = "Please enter your company name.";
    companyInput.classList.add("input-error");
    return;
}

if (!isRequired(data.service)) {
    serviceError.textContent = "Please select a service.";
    serviceInput.classList.add("input-error");
    return;
}

if (!isRequired(data["project-details"])) {
    projectDetailsError.textContent = "Please enter your project details.";
    projectDetailsInput.classList.add("input-error");
    return;
}

submitButton.disabled = true;
submitButton.textContent = "Submitting...";

setTimeout(() => {
    successMessage.textContent = "✅ Your request has been submitted successfully!";
    
    contactForm.reset();
    
    submitButton.disabled = false;
    submitButton.textContent = "Submit Reuest";

    setTimeout(() => {
    successMessage.textContent = "";
    }, 3000);

}, 2000);

console.log(data);
}

fullNameInput.addEventListener("input", function () {
    clearInputError(fullNameInput, fullNameError);
});

emailInput.addEventListener("input", function () {
    clearInputError(emailInput, emailError);
});

phoneInput.addEventListener("input", function () {
    clearInputError(phoneInput, phoneError);

    let value = phoneInput.value;
    value = value.replace(/\D/g, "");

if (value.length >10) {
    value = value.slice(0, 10);
}


if (value.length > 6) {
    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
}  else if (value.length > 3) {
    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
}  else if (value.length > 0) {
    value = `(${value}`;
}
phoneInput.value = value;

});

companyInput.addEventListener("input", function() {
    clearInputError(companyInput, companyError);
});

serviceInput.addEventListener("change", function() {
    clearInputError(serviceInput, serviceError);
});

projectDetailsInput.addEventListener("input", function() {
    clearInputError(projectDetailsInput, projectDetailsError);
});

