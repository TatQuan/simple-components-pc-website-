document.addEventListener("DOMContentLoaded", function () {
//-------------------------------Utilities--------------------------------
    function renderValidation(msgContainer, items) {
        msgContainer.innerHTML = items.map(item => {
            const cls = item.valid ? "valid" : "invalid";
            return `<div class="${cls} active">${item.msg}</div>`;
        }).join("");
        msgContainer.classList.toggle("active", items.length > 0);
    }

    // Clear error messages when input is empty
    function clearIfEmpty(inputElement, msgContainer) {
        if (!inputElement.value.trim()) {
            msgContainer.innerHTML = "";
            msgContainer.classList.remove("active");
        }
    }

//------------------------------LOGIN FORM-------------------------------
    const loginForm = document.querySelector(".form-signin");
    if (loginForm) {
        const emailInput = loginForm.querySelector("#email");
        const passwordInput = loginForm.querySelector("#password");

        const emailMsg = emailInput.parentElement.querySelector(".input-msg");
        const passwordMsg = passwordInput.parentElement.querySelector(".input-msg");

        // Validate email
        function validateEmail(email) {
            const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            return [
                { msg: "Email is required.", valid: !!email.trim() },
                { msg: "Email format is valid.", valid: !!email.trim() && isValidFormat }
            ];
        }

        // Validate password
        function validatePassword(password) {
            return [{ msg: "Password is required.", valid: !!password.trim() }];
        }

        // Validate email and password account
        function loginUser(email, password) {
            const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");

            const matchedUser = accounts.find(acc => acc.email === email && acc.password === password);

            if (matchedUser) {
                localStorage.setItem("currentUser", JSON.stringify(matchedUser));
                alert("Sign in successful!");
                window.location.href = "index.html";
            } else {
                alert("Email or password is incorrect!");
            }
        }

        // Input event listeners
        emailInput.addEventListener("input", () => {
            const checks = validateEmail(emailInput.value);
            renderValidation(emailMsg, checks);
            clearIfEmpty(emailInput, emailMsg);
        });

        passwordInput.addEventListener("input", () => {
            const checks = validatePassword(passwordInput.value);
            renderValidation(passwordMsg, checks);
            clearIfEmpty(passwordInput, passwordMsg);
        });

        // Form submit event
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const emailChecks = validateEmail(emailInput.value);
            const passwordChecks = validatePassword(passwordInput.value);

            renderValidation(emailMsg, emailChecks);
            renderValidation(passwordMsg, passwordChecks);

            const isValid = [...emailChecks, ...passwordChecks].every(item => item.valid);
            if (isValid) {
                loginUser(emailInput.value.trim(), passwordInput.value.trim());
            }
        });
    }


    //------------------------------SIGNUP FORM-------------------------------
    const signupForm = document.querySelector(".form-signup");
    if (signupForm) {
        const nameInput = signupForm.querySelector("#name");
        const emailInput = signupForm.querySelector("#email");
        const passwordInput = signupForm.querySelector("#signup-password");
        const confirmInput = signupForm.querySelector("#confirm-password");

        const nameMsg = nameInput.parentElement.querySelector(".input-msg");
        const emailMsg = emailInput.parentElement.querySelector(".input-msg");
        const passwordMsg = passwordInput.parentElement.querySelector(".input-msg");
        const confirmMsg = confirmInput.parentElement.querySelector(".input-msg");

        // Validate name
        function validateName(name) {
            return [{ msg: "Username is required.", valid: !!name.trim() }];
        }

        // Validate email
        function validateEmail(email) {
            const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            return [
                { msg: "Email is required.", valid: !!email.trim() },
                { msg: "Email format is valid.", valid: !!email.trim() && isValidFormat }
            ];
        }

        // Validate password
        function getPasswordValidation(password) {
            return [
                { msg: "At least 8 characters", valid: password.length >= 8 },
                { msg: "At least 1 uppercase letter", valid: /[A-Z]/.test(password) },
                { msg: "At least 1 number", valid: /\d/.test(password) }
            ];
        }

        // Validate confirm password
        function validateConfirm(password, confirm) {
            return [{
                msg: "Passwords match",
                valid: password === confirm && confirm.length > 0
            }];
        }

        // Save account function (mockup)
        function saveAccount(name, email, password) {
            const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
            accounts.push({ name, email, password }); // Not secure, just for demo
            localStorage.setItem("accounts", JSON.stringify(accounts));
        }

        // Input event listeners
        nameInput.addEventListener("input", () => {
            const checks = validateName(nameInput.value);
            renderValidation(nameMsg, checks);
            clearIfEmpty(nameInput, nameMsg);
        });

        emailInput.addEventListener("input", () => {
            const checks = validateEmail(emailInput.value);
            renderValidation(emailMsg, checks);
            clearIfEmpty(emailInput, emailMsg);
        });

        passwordInput.addEventListener("input", () => {
            const checks = getPasswordValidation(passwordInput.value);
            renderValidation(passwordMsg, checks);
            clearIfEmpty(passwordInput, passwordMsg);

            if (confirmInput.value) {
                const confirmChecks = validateConfirm(passwordInput.value, confirmInput.value);
                renderValidation(confirmMsg, confirmChecks);
            } else {
                clearIfEmpty(confirmInput, confirmMsg);
            }
        });

        confirmInput.addEventListener("input", () => {
            const confirmChecks = validateConfirm(passwordInput.value, confirmInput.value);
            renderValidation(confirmMsg, confirmChecks);
            clearIfEmpty(confirmInput, confirmMsg);
        });

        // Form submit event
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const nameChecks = validateName(nameInput.value);
            const emailChecks = validateEmail(emailInput.value);
            const passwordChecks = getPasswordValidation(passwordInput.value);
            const confirmChecks = validateConfirm(passwordInput.value, confirmInput.value);

            renderValidation(nameMsg, nameChecks);
            renderValidation(emailMsg, emailChecks);
            renderValidation(passwordMsg, passwordChecks);
            renderValidation(confirmMsg, confirmChecks);

            const isValid = [...nameChecks, ...emailChecks, ...passwordChecks, ...confirmChecks]
                .every(item => item.valid);

            if (isValid) {
                saveAccount(nameInput.value, emailInput.value, passwordInput.value);
                alert("Signup successful!");
                window.location.href = "signin.html";
            }
        });
    }
});
