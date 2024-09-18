document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const inputs = document.querySelectorAll("input");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission to allow validation

    let hasErrors = false;

    inputs.forEach((input) => {
      if (!validateField(input)) {
        hasErrors = true;
      }
    });

    // If there are no errors, submit the form
    if (!hasErrors) {
      // Use fetch to submit the form data
      fetch(form.action, {
        method: form.method,
        body: new FormData(form),
      })
        .then(() => {
          // After successful submission, reload the page
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });

  function validateField(input) {
    const inputBox = input.closest(".input-box");
    const label = inputBox.querySelector("label");

    // ValidatorJS Rules
    let isValid = true;
    if (input.name === "email") {
      // Use a more strict email validation
      isValid = validator.isEmail(input.value) && input.value.includes(".com");
      if (!isValid) {
        label.textContent = "Please enter a valid email address";
      }
    } else if (input.name === "password") {
      isValid = validator.isLength(input.value, { min: 6 }); // Check if the password is at least 6 characters
      if (!isValid) {
        label.textContent = "Password must be at least 6 characters long";
      }
    } else {
      isValid = input.value.trim() !== ""; // Ensure all other inputs are non-empty
      if (!isValid) {
        label.textContent = `${input.name.replace("-", " ")} cannot be empty`;
      }
    }

    if (!isValid) {
      // Add error styles if input is invalid
      inputBox.classList.add("error");
      label.style.display = "block";
    } else {
      // Remove error styles if input is valid
      inputBox.classList.remove("error");
      label.style.display = "none";
    }

    return isValid;
  }
});
