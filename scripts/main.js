"use strict";

//Global array
let todoarray = [];
//keeps track of which section number the id should be
let sectNum = 0;

//Starting point is the setup when event listeners are attached
document.addEventListener("DOMContentLoaded", setup);

function setup() {
    // If the local storage item call alltasks exists, load the array from storage
    if (localStorage.getItem('alltasks')) {
       loadTodo();
    }
    //find the button and give it a submit listener
    let form = document.getElementById('submit-form');
    form.addEventListener("submit", submit);
}

function submit(e) {
    // stop the form from doing the default behaviour
    e.preventDefault();
    let form = document.getElementById('submit-form');
    let sectionID = "sect" + sectNum;
    sectNum++;
    // create the to do object based on the info input in the form
    let newTodo = {
        task: form.task.value,
        description: form.description.value,
        importance: form.importance.value,
        category: form.category.value,
        id:  sectionID
    };
    // add the todo to the end of the array
    todoarray.push(newTodo);
    // append the todo webpage
    appendNewTodo(newTodo);
    // turn the array into a JSON string
    let alltasks = JSON.stringify(todoarray);
    // write allttasks string to webstorage
    localStorage.setItem('alltasks', alltasks);
}

function appendNewTodo(newTodo) {
    var section = document.createElement("SECTION");
    var topDiv = document.createElement("DIV");
    var starRatingDiv = document.createElement("DIV");
    var task = document.createElement("H3");
    var description = document.createElement("P");
    var importance = document.createElement("SPAN");
    var checkbox = document.createElement("INPUT")
    // add a click listener on the checkbox and call checkedAction when the checkbox is clicked
    checkbox.addEventListener('click', (()=> checkedAction(section)));
    task.innerText = newTodo.task;
    description.innerText = newTodo.description;
    // This sets which stars should be filled in for the importance level
    if (newTodo.importance == 0) {
        importance.innerText = "&#9734 &#9734 &#9734";
    }else if (newTodo.importance == 1){
        importance.innerText = "&#9733 &#9734 &#9734";
    }else if (newTodo.importance == 2){
        importance.innerText = "&#9733 &#9733 &#9734";
    }else if (newTodo.importance == 3){
        importance.innerText = "&#9733 &#9733 &#9733";
    }
    // This changes the background of the to do depending on which category it's associated with
    if (newTodo.category == "School") {
        section.style.backgroundColor = "pink";
    }
    else if (newTodo.category == "Work") {
        section.style.backgroundColor = "teal";
    }
    else if (newTodo.category == "Personal") {
        section.style.backgroundColor = "lightgreen";
    }
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", "delete");
    checkbox.setAttribute("name", "delete");
    section.setAttribute("id", newTodo.id);
    topDiv.setAttribute("class", "topBarTodo");
    starRatingDiv.setAttribute("class", "starRating");
    section.appendChild(topDiv);
    topDiv.appendChild(task);
    topDiv.appendChild(starRatingDiv);
    starRatingDiv.appendChild(importance);
    starRatingDiv.appendChild(checkbox);
    section.appendChild(description);
    document.body.appendChild(section);
}

function checkedAction(section) {
    // removes the section that was  passed into the function from the DOM
    section.remove();
    // finds the index of that section in the to do array
    let indexToRemove = todoarray.findIndex((todoInArray) => todoInArray.id === section.id);
    // remove the object at the index of the section
    todoarray.splice(indexToRemove, 1);
    // turn the array into a JSON string
    let alltasks = JSON.stringify(todoarray);
    // write allttasks string to webstorage
    localStorage.setItem('alltasks', alltasks);

}

function loadTodo() {
    // parses the array that was saved into local storage
    const data = JSON.parse(localStorage.getItem('alltasks'));
    // sets the global array to be equal to the parse
    todoarray = data;
    // for each item in the parse, append it to the webpage
    data.forEach((item) => {
        appendNewTodo(item);
    });
}