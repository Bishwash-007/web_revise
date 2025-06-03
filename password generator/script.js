const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copy-btn");
const lengthInput = document.getElementById("length");
const lowercaseCheckbox = document.getElementById("include-lowercase");
const uppercaseCheckbox = document.getElementById("include-uppercase");
const numbersCheckbox = document.getElementById("include-numbers");
const symbolsCheckbox = document.getElementById("include-symbols");
const generateBtn = document.getElementById("generate-btn");
const strengthLabel = document.getElementById("strength-label");

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:',.<>/?";

function generatePassword() {
  let charset = "";
  if (lowercaseCheckbox.checked) charset += LOWERCASE;
  if (uppercaseCheckbox.checked) charset += UPPERCASE;
  if (numbersCheckbox.checked) charset += NUMBERS;
  if (symbolsCheckbox.checked) charset += SYMBOLS;

  const length = parseInt(lengthInput.value, 10);

  if (!charset) return "";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function getStrength(password) {
  let score = 0;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return "weak";
  if (score === 3 || score === 4) return "medium";
  return "strong";
}

function updateStrength(password) {
  const strength = getStrength(password);
  strengthLabel.textContent =
    strength.charAt(0).toUpperCase() + strength.slice(1);
  strengthLabel.className = "";
  strengthLabel.classList.add(strength);
}

function updatePassword() {
  const password = generatePassword();
  passwordInput.value = password;
  updateStrength(password);
}

generateBtn.addEventListener("click", updatePassword);

copyBtn.addEventListener("click", () => {
  if (!passwordInput.value) return;
  navigator.clipboard.writeText(passwordInput.value).then(() => {
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
      copyBtn.innerHTML = '<i class="far fa-copy"></i>';
    }, 1000);
  });
});

[lengthInput, lowercaseCheckbox, uppercaseCheckbox, numbersCheckbox, symbolsCheckbox].forEach(
  (el) => el.addEventListener("change", updatePassword)
);

updatePassword();