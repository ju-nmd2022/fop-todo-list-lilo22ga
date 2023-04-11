const addElement = document.getElementById("addToList");
const addButton = document.getElementById("addBtn");
const weekdayButton = document.getElementById("weekdayBtn");
const toDoElements = document.querySelector(".toDoItems");

let toDos = [];

const getToDoList = localStorage.getItem("toDos");
if (getToDoList) {
  toDos = JSON.parse(getToDoList);
}

//3
const addIcons = (parentDiv, toDo) => {
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

  checkmark.addEventListener("click", () => markAsDone(toDo));
  deletemark.addEventListener("click", () => removeFromList(toDo));
};

//2
//the following code was created with inspiration from Peter Heinum
const updateHTMLAndSaveList = () => {
  localStorage.setItem("toDos", JSON.stringify(toDos));
  toDoElements.innerHTML = "";
  for (let toDo of toDos) {
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("toDoItem");

    const toDoTextDiv = document.createElement("div");
    toDoTextDiv.innerHTML = toDo.text;

    parentDiv.appendChild(toDoTextDiv);
    addIcons(parentDiv, toDo);
    toDoElements.appendChild(parentDiv);

    if (toDo.completed === true) {
      toDoTextDiv.style.textDecoration = "line-through";
    }
  }
};

//1
const addToDos = () => {
  if (addElement.value.length > null) {
    const text = addElement.value;
    const completed = false;
    const id = Math.floor(Math.random() * 10000);
    const weekday = weekdayButton.innerHTML;
    const toDo = { text, completed, id, weekday };
    toDos.push(toDo);
    console.log(toDo.text);

    updateHTMLAndSaveList();
  }
};

const markAsDone = (toDo) => {
  toDo.completed = true;
  updateHTMLAndSaveList();
};

//the following code was created with inspiration from Peter Heinum
const removeFromList = (toDo) => {
  const listIndex = toDos.findIndex((item) => item.id === toDo.id);
  toDos.splice(listIndex, 1);

  updateHTMLAndSaveList();
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

window.addEventListener("load", updateHTMLAndSaveList);
