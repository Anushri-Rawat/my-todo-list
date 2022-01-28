//--------------Selectors-----------------
const img = document.querySelector("img");
const body = document.querySelector("body");
const newItemInput = document.getElementById("addItem");
const todoList = document.querySelector(".content ul");
const itemsLeft = document.querySelector(".item-left");
const allBtn = document.querySelectorAll(".all");
const activeBtn = document.querySelectorAll(".active");
const completedBtn = document.querySelectorAll(".completed");
const add = document.querySelector(".add-item span");
const clearCompleted = document.querySelector(".clear");

//------------------Event Listeners--------------
let taskList = JSON.parse(localStorage.getItem("taskList"));
window.addEventListener("load", () => {
  taskList.forEach((val) => {
    createNewTodoItem(val["task"]);
  });
  document.querySelectorAll(".list-item input").forEach((i) =>
    i.addEventListener("click", function () {
      if (i.checked) {
        updateItemsCount("minus");
      } else {
        updateItemsCount("add");
      }
    })
  );
});

img.addEventListener("click", function (e) {
  let check = e.target.classList;
  if (check.contains("dark")) {
    body.classList = "theme-light";
    img.className = "light";
    img.src = "./images/icon-moon.svg";
  } else {
    body.classList = "theme-dark";
    img.className = "dark";
    img.src = "./images/icon-sun.svg";
  }
});

add.addEventListener("click", () => {
  if (newItemInput.value.length > 0) {
    createNewTodoItem(newItemInput.value);
    local(object(newItemInput.value));
    newItemInput.value = "";
  }
});

newItemInput.addEventListener("keypress", (e) => {
  if (e.charCode === 13 && newItemInput.value.length > 0) {
    createNewTodoItem(newItemInput.value);
    local(object(newItemInput.value));
    newItemInput.value = "";
  }
});

todoList.addEventListener("click", (e) => {
  let itemremove = e.target.closest("label").innerText;
  if (e.target.classList.contains("remove")) {
    removeTodoItem(e.target.parentElement.parentElement, itemremove, "del");
  }
});

clearCompleted.addEventListener("click", () => {
  document
    .querySelectorAll('.list-item input[type="checkbox"]:checked')
    .forEach((item) => {
      removeTodoItem(
        item.closest("li"),
        item.nextElementSibling.nextElementSibling.innerHTML,
        "clear"
      );
    });
});
activeBtn.forEach((i) =>
  i.addEventListener("click", function () {
    displayAllLis();
    console.log("hello");
    document
      .querySelectorAll('.list-item input[type="checkbox"]:checked')
      .forEach((item) => {
        item.closest("li").style.display = "none";
      });
  })
);

allBtn.forEach((i) => i.addEventListener("click", displayAllLis));

completedBtn.forEach((i) =>
  i.addEventListener("click", function () {
    displayAllLis();
    todoList.querySelectorAll("li").forEach((item) => {
      if (!item.querySelector("input").checked) {
        item.style.display = "none";
      }
    });
  })
);
//-----------functions-----------------------
function object(elem) {
  let obj = {
    task: elem,
    id: Math.floor(Math.random() * 1000),
  };
  return obj;
}
//------------------To create a new task-------------------
function createNewTodoItem(val) {
  const entry = document.createElement("li");
  entry.innerHTML = `<label class="list-item">
    <input type="checkbox">
    <span class="checkmark"></span>
    <span>${val}</span>
    <span class="remove"></span>
</label>`;
  updateItemsCount("add");
  todoList.append(entry);
}
//----------------to delete a task-------------------------
function removeTodoItem(val, target, ad) {
  const temp = taskList.filter((val) => val.task != target.trim());
  localStorage.setItem("taskList", JSON.stringify(temp));
  val.remove();
  if (ad != "clear") {
    updateItemsCount("minus");
  }
}
//---------------------local storage-----------------------------
let task = [];
function local(ele) {
  task = JSON.parse(localStorage.getItem("taskList")) || [];
  task.push(ele);
  localStorage.setItem("taskList", JSON.stringify(task));
}
//----------------To update the count of completed tasks-----------
function updateItemsCount(op) {
  if (op == "add") {
    itemsLeft.innerText++;
  } else itemsLeft.innerText--;
}
//----------to display all list-items---------------------------
function displayAllLis() {
  todoList
    .querySelectorAll("li")
    .forEach((item) => (item.style.display = "block"));
}
