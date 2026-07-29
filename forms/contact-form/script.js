const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const submitButton = document.getElementById("submitButton");

form.addEventListener('submit', async event => {
  event.preventDefault();

  // Stop submission if required fields are incomplete.
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Prevent duplicate submissions.
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting Request...';

  status.textContent = 'Please wait while we send your request.';
  status.className = 'form-status';

  try {
    const formData = new FormData(form);

    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('The request could not be submitted.');
    }

    form.reset();

    submitButton.textContent = 'Request Submitted ✓';

    status.textContent =
      'Thank you for contacting Backbay Commercial. Your request was received successfully. A representative will contact you within one business day.';

    status.className = 'form-status form-status-success';

    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = 'Submit Request';

      status.textContnent = '';
      status.className = 'form=status';
    }, 5000);


  } catch (error) {
    console.error('Form submission error:', error);

    status.textContent =
      'We could not submit your request. Please check your connection and try again.';

    status.className = 'form-status form-status-error';

    submitButton.disabled = false;
    submitButton.textContent = 'Submit Request';
  }
});
async function initAddressAutocomplete() {
  const addressInput = document.getElementById("projectAddress");

  if (!addressInput) {
    console.error("Project Address input was not found.");
    return;
  }

  
  const autocomplete = new google.maps.places.Autocomplete(addressInput, {
    types: ["address"],
    componentRestrictions: { country: "us" },
    fields: ["formatted_address"],
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    if (place.formatted_address) {
      addressInput.value = place.formatted_address;
    }
  });
}

window.addEventListener("load", initAddressAutocomplete);

const phoneInput = document.getElementById("phone");

if (phoneInput) {
  phoneInput.addEventListener("input", function (e) {
    let numbers = e.target.value.replace(/\D/g, "");

    if (numbers.length > 10) {
      numbers = numbers.substring(0, 10);
    }

    if (numbers.length > 6) {
      e.target.value = `(${numbers.substring(0, 3)}) ${numbers.substring(3, 6)}-${numbers.substring(6)}`;
    } else if (numbers.length > 3) {
      e.target.value = `(${numbers.substring(0, 3)}) ${numbers.substring(3)}`;
    } else if (numbers.length > 0) {
      e.target.value = `(${numbers}`;
    }
  });
}