const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Helper to show message
function showMessage(input, message, type) {
    const small = input.parentElement.querySelector("small");
    small.textContent = message;
    small.className = type ? type : "";
}

// Clear all messages
function clearMessages() {
    document.querySelectorAll(".form-group small").forEach(small => {
        small.textContent = "";
        small.className = "";
    });
}

form.addEventListener("submit", function (e) {
    clearMessages();
    let valid = true;

    // Username
    if (username.value.trim() === "") {
        showMessage(username, "Username is required.", "error");
        valid = false;
    } else {
        showMessage(username, "Looks good!", "success");
    }

    // Email
    if (!emailRegex.test(email.value.trim())) {
        showMessage(email, "Please enter a valid email.", "error");
        valid = false;
    } else {
        showMessage(email, "Looks good!", "success");
    }

    // Password
    if (password.value.length < 6) {
        showMessage(password, "Password must be at least 6 characters.", "error");
        valid = false;
    } else {
        showMessage(password, "Looks good!", "success");
    }

    // Confirm Password
    if (confirmPassword.value !== password.value || confirmPassword.value === "") {
        showMessage(confirmPassword, "Passwords do not match.", "error");
        valid = false;
    } else {
        showMessage(confirmPassword, "Passwords match!", "success");
    }

    if (!valid) {
        e.preventDefault();
    }
});

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-theme');
        themeToggle.textContent = '🌞';
    } else {
        body.classList.remove('light-theme');
        themeToggle.textContent = '🌙';
    }
    localStorage.setItem('theme', theme);
}

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const isLight = body.classList.contains('light-theme');
    setTheme(isLight ? 'dark' : 'light');
});