const contactForm = document.getElementById("contactValidationForm");

if (contactForm) {
    const fields = contactForm.querySelectorAll("input, textarea");
    const result = document.getElementById("contactResult");
    let submitted = false;

    function validateField(field) {
        const valid = field.checkValidity();

        field.classList.toggle("is-valid", valid);
        field.classList.toggle("is-invalid", !valid);
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        submitted = true;

        fields.forEach(validateField);

        if (contactForm.checkValidity()) {
            result.textContent = "Validation passed! This is a demo form.";
        } else {
            result.textContent = "";
            contactForm.querySelector(":invalid").focus();
        }
    });

    fields.forEach(function (field) {
        field.addEventListener("input", function () {
            result.textContent = "";

            if (submitted) {
                validateField(field);
            }
        });
    });
}
const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
    const fields = registrationForm.querySelectorAll(
        'input:not([type="checkbox"]), select'
    );

    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const genderError = document.getElementById("genderError");
    const result = document.getElementById("registrationResult");

    let submitted = false;

    function checkPasswords() {
        confirmPassword.setCustomValidity("");

        if (confirmPassword.value !== password.value) {
            confirmPassword.setCustomValidity("Passwords do not match.");
        }
    }

    function updateRegistrationFields() {
        checkPasswords();

        fields.forEach(function (field) {
            const valid = field.checkValidity();

            field.classList.toggle("is-valid", valid);
            field.classList.toggle("is-invalid", !valid);
        });

        const selectedGender = registrationForm.querySelector(
            'input[name="gender"]:checked'
        );

        genderError.hidden = Boolean(selectedGender);
    }

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        submitted = true;

        updateRegistrationFields();

        if (registrationForm.checkValidity()) {
            result.textContent =
                "Validation passed! Demo only: no account was created.";
        } else {
            result.textContent = "";
            registrationForm.querySelector(":invalid").focus();
        }
    });

    registrationForm.addEventListener("input", function () {
        result.textContent = "";
        checkPasswords();

        if (submitted) {
            updateRegistrationFields();
        }
    });

    registrationForm.addEventListener("change", function () {
        result.textContent = "";

        if (submitted) {
            updateRegistrationFields();
        }
    });

    registrationForm.addEventListener("reset", function () {
        submitted = false;
        result.textContent = "";
        genderError.hidden = true;
        confirmPassword.setCustomValidity("");

        fields.forEach(function (field) {
            field.classList.remove("is-valid", "is-invalid");
        });
    });
}