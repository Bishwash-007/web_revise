const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");

// Ensure all cards are draggable and have unique IDs
cards.forEach((card, index) => {
  card.setAttribute("draggable", "true");
  if (!card.id) {
    card.id = `card-${index}`;
  }
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);
});

lists.forEach((list) => {
  list.addEventListener("dragover", dragOver);
  list.addEventListener("dragenter", dragEnter);
  list.addEventListener("dragleave", dragLeave);
  list.addEventListener("drop", dragDrop);
});

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  setTimeout(() => {
    e.target.classList.add("hide"); // optional visual cue
  }, 0);
}

function dragEnd(e) {
  e.target.classList.remove("hide");
  console.log("Drag ended");
}

function dragOver(e) {
  e.preventDefault(); // Needed to allow drop
}

function dragEnter(e) {
  e.preventDefault();
  e.currentTarget.classList.add("over");
}

function dragLeave(e) {
  e.currentTarget.classList.remove("over");
}

function dragDrop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);
  e.currentTarget.appendChild(card);
  e.currentTarget.classList.remove("over");
}