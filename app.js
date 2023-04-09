//create array for weekdays later?

const mondayElement = document.querySelector(".monday");
const tuesdayElement = document.querySelector(".tuesday");
const wednesdayElement = document.querySelector(".wednesday");
const thursdayElement = document.querySelector(".thursday");
const fridayElement = document.querySelector(".friday");
const addElement = document.getElementById("addToList");
const addButton = document.getElementById("addBtn");
const toDoMonday = document.querySelector(".toDoItem");
const toDoElements = document.querySelector(".toDoItems");
const weekdayButton = document.getElementById("weekdayBtn");

let toDos = [];

const getToDoList = localStorage.getItem("toDos");
if (getToDoList) {
  toDos = JSON.parse(getToDoList);
}

//3
const addIcons = (parentDiv) => {
  const iconsDiv = document.createElement("div");
  iconsDiv.classList.add("icons");

  const checkmark = document.createElement("img");
  checkmark.src = "checkmark2.png";
  checkmark.alt = "checkmark";
  checkmark.classList.add("checkmark");

  const deletemark = document.createElement("img");
  deletemark.src = "delete2.png";
  deletemark.alt = "deletemark";
  deletemark.classList.add("deletemark");

  iconsDiv.appendChild(checkmark);
  iconsDiv.appendChild(deletemark);
  parentDiv.appendChild(iconsDiv);

  checkmark.addEventListener("click", markAsDone);
  deletemark.addEventListener("click", removeFromList);
};

//2
const updateList = () => {
  toDoElements.innerHTML = "";
  for (let toDo of toDos) {
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("toDoItem");

    const newToDo = document.createElement("div");
    newToDo.innerHTML = toDo;

    parentDiv.appendChild(newToDo);
    addIcons(parentDiv);
    toDoElements.appendChild(parentDiv);
  }
};

//1
const addToDos = () => {
  if (addElement.value.length > null) {
    const toDo = addElement.value;
    toDos.push(toDo);
    console.log(toDo);

    localStorage.setItem("toDos", JSON.stringify(toDos));
    updateList();
  }
};

const markAsDone = (event) => {
  const checkmark = event.target;
  const toDoItem = checkmark.parentElement.parentElement;
  if (toDoItem) {
    toDoItem.style.textDecoration = "line-through";
  }
};

const removeFromList = (event) => {
  const deletemark = event.target;
  const toDoItem = deletemark.parentElement.parentElement;
  if (toDoItem) {
    toDoItem.remove();
  }

  const listIndex = toDos.indexOf(toDoItem.innerHTML);
  toDos.splice(listIndex, 1);
  updateList();
};

const changeWeekday = () => {
  if (weekdayButton.innerHTML === "Monday") {
    weekdayButton.innerHTML = "Tuesday";
  } else if (weekdayButton.innerHTML === "Tuesday") {
    weekdayButton.innerHTML = "Wednesday";
  } else if (weekdayButton.innerHTML === "Wednesday") {
    weekdayButton.innerHTML = "Thursday";
  } else if (weekdayButton.innerHTML === "Thursday") {
    weekdayButton.innerHTML = "Friday";
  } else if (weekdayButton.innerHTML === "Friday") {
    weekdayButton.innerHTML = "Monday";
  }
};

addButton.addEventListener("click", addToDos);
weekdayButton.addEventListener("click", changeWeekday);

window.addEventListener("load", updateList);
