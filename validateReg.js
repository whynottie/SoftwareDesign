const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementById("form");
const errorElement = document.getElementById("error");
const users = ["deanf47"];

form.addEventListener("submit", (e) => {
    let error_messages = [];

    if (username.value === '' || username.value === null) {
        error_messages.push("Username is required.");
    }

    if (username.value.length < 6) {
        error_messages.push("Username must be at least 6 characters.");
    }

    if (users.includes(username.value)) {
        error_messages.push("Username is already taken.");
    }

    if (password.value === '' || password.value === null) {
        error_messages.push("Password is required.");
    }

    if (password.value.length < 8) {
        error_messages.push("Password must be at least 8 characters.");
    }

    if (password.value === 'password') {
        error_messages.push("Password cannot be 'password'.");
    }

    if (error_messages.length > 0) {
        e.preventDefault()
        errorElement.innerText = error_messages.join('\n');
    }
    
});