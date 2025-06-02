const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);
paletteContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy-btn")) {
    const hexValue = e.target.previousElementSibling.textContent;
    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySuccess(e.target))
      .catch((err) => console.log(err));
  }
});

function showCopySuccess(button) {
  button.classList.remove("far", "fa-copy");
  button.classList.add("fas", "fa-check");
  button.style.color = "#48bb78";
  setTimeout(() => {
    button.classList.remove("fas", "fa-check");
    button.classList.add("far", "fa-copy");
    button.style.color = "";
  }, 1000);
}

function generatePalette() {
  const colors = [];
  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor());
  }
  updatePaletteDisplay(colors);
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updatePaletteDisplay(colors) {
  const colorBoxes = document.querySelectorAll(".color-box");
  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector(".color");
    const hexValue = box.querySelector(".hex-value");

    if (colorDiv && hexValue && color) {
      colorDiv.style.backgroundColor = color;
      hexValue.textContent = color;
    }
  });
}

generatePalette();
