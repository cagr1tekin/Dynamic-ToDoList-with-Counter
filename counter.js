const todoAddBtn = document.querySelector("#todo-add-btn");
const count1 = document.querySelector("#count1");
const count4 = document.querySelector("#count4");
const todoAddForm = document.querySelector("#todo-add-form");
const addInput = document.querySelector(".todo-add-control");
const todoList = document.querySelector(".todo-list");
const checkBox = document.querySelector(".check-delete");

let sayac1 = 0;
let sayac4 = 0;
let todos = [];

runEvents();

function displayCount1 (){
    sayac1++;
    updateCount1();
}

function updateCount1 (){
    count1.textContent = sayac1;
}

function displayCount4 (){
    sayac4++;
    updateCount4();
}

function updateCount4 (){
    // localStorage.setItem("count4",sayac4);
    // count4.textContent = localStorage.getItem("count4");
    count4.textContent = sayac4;
}

function runEvents(){
    todoAddForm.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    todoList.addEventListener("click",todoDeleteListUI);
}

function todoDeleteListUI(e){
    if(e.target.className==="fa fa-remove"){
        // ekrandan silme
        
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        // storageden silme
        todoDeleteListStorage(todo.textContent);
        sayac4++;
    }
    updateCount4();
}

function todoDeleteListStorage(deleteTodo){
    checkTodosStorage();
    todos.forEach(function(todo,index){
        
        if(deleteTodo===todo){
            todos.splice(index,1);
            
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));

}

function pageLoaded(){
    checkTodosStorage();
    todos.forEach(function(todo){
        todoAddListUI(todo);
    });
}

function addTodo(x){
    const inputText = addInput.value.trim();
    x.preventDefault();
    if(inputText == null || inputText == ""){
        alert("boş bir değer girdiniz");
    }
    else{
        todoAddListUI(inputText);
        todoAddListStorage(inputText);
    }
}

function todoAddListUI(newTodo){
    const li = document.createElement("li");
    
    li.className="list-group-item";
    li.textContent=newTodo;

    const a = document.createElement("a");

    a.href="#";
    a.className="delete-item";
    
    const i =document.createElement("i");

    i.className="fa fa-remove";
    i.style.color= "rgba(0, 0, 0, 0.5)";

    addInput.value="";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);
    displayCount1();
}

function todoAddListStorage(newTodo){
    checkTodosStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodosStorage(){
    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}