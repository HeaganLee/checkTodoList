let todoList = new Array();
let saveDay = "";

class TodoEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new TodoEvent();
        }
        return this.#instance;
    }

    addEventPlusButtonClick() {
        const plusButton = document.querySelector(".plus-button");
        plusButton.onclick = () => {
            const inputTodo = document.querySelector(".input-todo");
            if(inputTodo.value == "") {
                return;
            }
            TodoService.getInstance().addTodoList();
            inputTodo.value = "";
            TodoService.getInstance().addLoadSubHeader();
        }
    }

    addEventPlusKeyup() {
        const inputTodo = document.querySelector(".input-todo");
        inputTodo.onkeyup = () => {
            if(window.event.keyCode == 13) {
                const plusButton = document.querySelector(".plus-button");
                plusButton.click();
            }
        }
    }

    addEventAllDelete() {
        const allDeleteButton = document.querySelector(".all-delete-button");
        allDeleteButton.onclick = () => {
            TodoService.getInstance().deleteAllTodoList();
            TodoService.getInstance().addLoadSubHeader();
        }
    }

    addEventSelectedDelete() {
        const selectedDeleteButton = document.querySelector(".selected-delete-button");
        selectedDeleteButton.onclick = () => {
            const checkedIndexList = new Array();
            const todoCheckboxs = document.querySelectorAll(".todo-checkbox");

            todoCheckboxs.forEach((todoCheckbox,index) => {
                if(todoCheckbox.checked){
                    checkedIndexList.push(index);
                }
            });
            TodoService.getInstance().deleteSelectedTodoList(checkedIndexList);
            TodoService.getInstance().addLoadSubHeader();
        }
    }

    addEventDelete() {
        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.onclick = () => {
                TodoService.getInstance().deleteTodoList(index);
                TodoService.getInstance().addLoadSubHeader();
            }
        });
    }

    addEventEdit() {
        const editButtons = document.querySelectorAll(".edit-button");
        const todoTexts = document.querySelectorAll(".todo-text");
        editButtons.forEach((editButton,index) => {
            editButton.onclick = () => {
               todoTexts[index].disabled = false;
               todoTexts[index].focus();

               todoTexts[index].onkeyup = () => {
                if(window.event.keyCode == 13){
                    const editText = todoTexts[index].value;
                    TodoService.getInstance().editSaveTodoList(editText, index);
                    todoTexts[index].disabled = true;
                }
            }
        }
        });
    }

}

class TodoService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new TodoService();
        }
        return this.#instance;
    }

    todoList = null;

    constructor() {
        if(localStorage.getItem("todoList") == null) {
            this.todoList = new Array();
        }else {
            this.todoList = JSON.parse(localStorage.getItem("todoList"));
        }

        if(localStorage.getItem("saveDay") == null) {
            this.saveDay = "";
        }else {
            this.saveDay = JSON.parse(localStorage.getItem("saveDay"));
        }

        this.addAndLoadTodoList();
        this.addPastListClear(this.saveDay);
        this.addLoadSubHeader();
    }

    updateLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
        localStorage.setItem("saveDay" ,JSON.stringify(this.saveDay));
        this.addAndLoadTodoList();
    }

    addTodoList() {
        const inputTodo = document.querySelector(".input-todo");
        const nowDate = new Date();
        const todoObj = {
            todoDate: `${nowDate.getFullYear()}-${nowDate.getMonth()+1}-${nowDate.getDate()}`,
            todoContent: inputTodo.value
        }

        this.saveDay = todoObj.todoDate;
        this.todoList.push(todoObj);
        this.updateLocalStorage();
    }

    deleteTodoList(index) {
        this.todoList.splice(index,1);
        this.updateLocalStorage();
    }

    deleteAllTodoList() {
        this.todoList = new Array();
        this.updateLocalStorage();
    }
    
    deleteSelectedTodoList(checkedIndexList) {
        checkedIndexList = checkedIndexList.reverse();
        checkedIndexList.forEach(index => {
            this.deleteTodoList(index);
        });
    }

    editSaveTodoList(editText, index) {
        this.todoList[index].todoContent = editText;
        this.updateLocalStorage();
    }

    addAndLoadTodoList() {
        
        const todoListContent = document.querySelector(".todo-list-content");
        todoListContent.innerHTML = ``;
        
        this.todoList.forEach(todObj => {
            todoListContent.innerHTML +=
            `<div class="todo-list">
            <input type="checkbox" class="todo-checkbox" id="cklist">
            <div class="todo-createday">${todObj.todoDate}</div>
            <input type="text" class="todo-text" value="${todObj.todoContent}" disabled>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
            </div>`
        });
        
        TodoEvent.getInstance().addEventDelete();
        TodoEvent.getInstance().addEventEdit();
        
        
    }

    addLoadSubHeader() {
        const todoListContentHeader = document.querySelector(".todo-list-content-header");
        const nowDate = new Date();
        const subHeaderDate = `${nowDate.getFullYear()}-${nowDate.getMonth()+1}-${nowDate.getDate()}`
        var count = this.todoList

        todoListContentHeader.innerHTML = `
                        <h1 class="list-header">
                       
                        <a href="./sub_calendar.html"><i class="fa-solid fa-calendar-days"></i></a>
                        ${subHeaderDate}     TodoList (total : ${count.length})
                        </h1>`
        

    }

    addPastListClear(saveDay) {
        const nowDate = new Date();
        const toDay = `${nowDate.getFullYear()}-${nowDate.getMonth()+1}-${nowDate.getDate()}`;
        // const toDay = "2023-04-21";
        if(saveDay == null){
            return;
        }

        if(saveDay == toDay){
            return;
        }else{
            this.deleteAllTodoList();
        }

    }
}