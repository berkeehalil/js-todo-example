//TODO add elements

//element selection

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;

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
    todos = getItemsFromLS();
    todos.forEach(function (item) {
        createItem(item);
    })
}

// get items from local storage
function getItemsFromLS() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
}

// set item to local storage
function setItemToLS(newTodo) {
    todos = getItemsFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// create item
function createItem(newTodo) {
    // create li
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newTodo));

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

    setItemToLS(input.value);

    input.value = "";

    e.preventDefault();
}

// delete item

function deleteItem(e) {

    if (e.target.className == "fas fa-times") {
        if (confirm("Are you sure ?")) {
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

// delete todo from local storage
function deleteTodoFromStorage(deletetodo) {
    let todos = getItemsFromLS();

    todos.forEach(function (todo, index) {
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

// delete all items

function deleteAllItems(e) {
    if (confirm("Are you sure you want to delete all elements ?")) {

        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild)
        }
        
        localStorage.clear();
        
        // taskList.innerHTML="";  //alternative
    }
}
