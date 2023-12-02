"use strict";

const userInput = document.querySelector(".user-input");
const addBtn = document.querySelector(".input-btn");
const toDoList = document.querySelector(".to-do-list");
const yearEl = document.querySelector(".year");

// Add Item
const addItem = function () {
  const inputValue = userInput.value.trim();

  if (inputValue !== "") {
    const listItem = document.createElement("li");
    listItem.className = "list-item";

    const textItem = document.createElement("span");
    textItem.className = "text-item";
    textItem.textContent = inputValue;

    const deleteIcon = document.createElement("ion-icon");
    deleteIcon.className = "delete-icon";
    deleteIcon.setAttribute("name", "close-outline");

    toDoList.appendChild(listItem);
    listItem.appendChild(textItem);
    listItem.appendChild(deleteIcon);

    userInput.value = "";

    saveToLocalStorage();
  }
};

addBtn.addEventListener("click", addItem);

// Delete Item
const removeItem = function (e) {
  if (e.target.classList.contains("delete-icon")) {
    const deleteListItem = e.target.closest(".list-item");
    toDoList.removeChild(deleteListItem);
    saveToLocalStorage();
  }
};

toDoList.addEventListener("click", removeItem);

// Press key add item
userInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addItem();
});

// Complete item
const markCompleteItem = function (e) {
  const clickedEl = e.target;
  if (
    clickedEl.classList.contains("list-item") ||
    clickedEl.classList.contains("text-item")
  ) {
    const currentListItem = clickedEl.closest(".list-item");
    currentListItem.classList.toggle("completed-item");
    saveToLocalStorage();
  }
};

toDoList.addEventListener("click", markCompleteItem);

// LocalStorage Save
const saveToLocalStorage = function () {
  const items = document.querySelectorAll(".list-item");
  const itemsArray = Array.from(items).map((item) => {
    const itemText = item.querySelector(".text-item").textContent;
    const isCompleted = item.classList.contains("completed-item");
    return { text: itemText, completed: isCompleted };
  });
  localStorage.setItem("toDoItems", JSON.stringify(itemsArray));
};

// LocalStorage Load
const loadFromLocalStorage = function () {
  const savedItems = localStorage.getItem("toDoItems");
  if (savedItems) {
    const itemsArray = JSON.parse(savedItems);

    itemsArray.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.className = item.completed
        ? "list-item completed-item"
        : "list-item";

      const textItem = document.createElement("span");
      textItem.className = "text-item";
      textItem.textContent = item.text;

      const deleteIcon = document.createElement("ion-icon");
      deleteIcon.className = "delete-icon";
      deleteIcon.setAttribute("name", "close-outline");

      toDoList.appendChild(listItem);
      listItem.appendChild(textItem);
      listItem.appendChild(deleteIcon);
    });
  }
};

//When the page is loaded
document.addEventListener("DOMContentLoaded", loadFromLocalStorage);

//Current year text update
const date = new Date();
const currentYear = date.getFullYear();
yearEl.textContent = currentYear;
