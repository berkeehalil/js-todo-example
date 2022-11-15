//TODO add elements

//element selection

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
const items = ["Todo 1", "Todo 2", "Todo 3", "Todo 4"];

loadItems();

eventListeners();

function eventListeners() {

    // submit event
    form.addEventListener("submit", addNewItem);

    // delete event
    taskList.addEventListener("click", deleteItem);

    // delete all event
    btnDeleteAll.addEventListener("click", deleteAllItems);
}

// load items
function loadItems() {
    items.forEach(function (item) {
        createItem(item);
    })
}

// create item
function createItem(text) {
    // create li
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(text));

    // create a
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);

    taskList.appendChild(li);
}

// add item
function addNewItem(e) {
    if (input.value == '') {
        alert("add new item");
    }

    createItem(input.value);

    input.value = "";

    e.preventDefault();
}

// delete item

function deleteItem(e) {

    if (e.target.className == "fas fa-times") {
        if (confirm("Are you sure ?")) {
            e.target.parentElement.parentElement.remove();
        }
    }
    e.preventDefault();
}

// delete all items

function deleteAllItems(e) {
    if (confirm("Are you sure you want to delete all elements ?")) {
        taskList.childNodes.forEach(function (item) {
            if (item.nodeType === 1) {
                item.remove();
            }
        })
        // taskList.innerHTML="";  //alternative
    }
}
