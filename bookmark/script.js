const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks);

addBookmarkBtn.addEventListener("click", () => {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();

  if (!name || !url) {
    alert("Please enter both name and URL.");
    return;
  } else if (!/^https?:\/\//i.test(url)) {
    alert("Please enter a valid URL starting with http:// or https://");
    return;
  }
  const bookmark = { name, url };
  const listItem = document.createElement("li");
  listItem.innerHTML = `<a href="${url}" target="_blank">${name}</a> <button class="delete-btn">Delete</button>`;
  bookmarkList.appendChild(listItem);
  bookmarkNameInput.value = "";
  bookmarkUrlInput.value = "";
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", deleteBookmark);
  });
});

function loadBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.forEach((bookmark) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<a href="${bookmark.url}" target="_blank">${bookmark.name}</a> <button class="delete-btn">Delete</button>`;
    bookmarkList.appendChild(listItem);
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", deleteBookmark);
  });
}

// Function to handle deleting a bookmark
function deleteBookmark(event) {
  const listItem = event.target.closest("li");
  const link = listItem.querySelector("a");
  const url = link.getAttribute("href");
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks = bookmarks.filter(bookmark => bookmark.url !== url);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  listItem.remove();
}
