const taskInput = document.getElementById("task");
const addTaskBtn = document.getElementById("add-task-btn");
const todosList = document.getElementById("todos-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const emptyState = document.querySelector(".empty-state");
const dateElement = document.getElementById("date");
const filters = document.querySelectorAll(".filter");

let todos = [];
let currentFilter = "all";

addTaskBtn.addEventListener("click", () => {
  addTodo(taskInput.value);
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo(taskInput.value);
  }
});

clearCompletedBtn.addEventListener("click", clearCompleted);

function addTodo(task) {
  if (task.trim() === "") return;

  const todo = {
    id: Date.now(),
    task: task.trim(),
    completed: false,
  };

  todos.push(todo);
  saveTodos();
  taskInput.value = "";
  renderTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
  updateItemsCount();
  checkEmptyState();
}

function updateItemsCount() {
  const count = todos.filter((todo) => !todo.completed).length;
  // Update the items left count
  itemsLeft.textContent = `${count} item${count !== 1 ? "s" : ""} left`;
}

function checkEmptyState() {
  if (todos.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}

function renderTodos() {
  todosList.innerHTML = "";
  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true; // all
  });

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `
        <input type="checkbox" class="toggle" ${
          todo.completed ? "checked" : ""
        } data-id="${todo.id}">
        <span class="text ${todo.completed ? "completed" : ""}">${
      todo.task
    }</span>
        <button class="delete-btn" data-id="${todo.id}">X</button>
        `;
    todosList.appendChild(li);
  });

  updateItemsCount();
  checkEmptyState();
}

todosList.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle")) {
    toggleTodo(e.target.dataset.id);
  } else if (e.target.classList.contains("delete-btn")) {
    deleteTodo(e.target.dataset.id);
  }
});
function toggleTodo(id) {
  const todo = todos.find((todo) => todo.id === parseInt(id));
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== parseInt(id));
  saveTodos();
  renderTodos();
}
function clearCompleted() {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
}
function setFilter(filter) {
  currentFilter = filter;
  renderTodos();
  filters.forEach((f) => f.classList.remove("active"));
  document
    .querySelector(`.filter[data-filter="${filter}"]`)
    .classList.add("active");
}
filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    setFilter(filter.dataset.filter);
  });
});
function loadTodos() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }
  renderTodos();
}
function updateDate() {
  const today = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  dateElement.textContent = today.toLocaleDateString("en-US", options);
}
document.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  updateDate();
});
