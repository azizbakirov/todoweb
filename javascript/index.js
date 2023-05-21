const form = document.querySelector(".title_desc");
const todo = document.querySelector(".todos");
const cancel = document.querySelector(".cancel");
const addTask = document.querySelector(".add_task");
const activeTask = document.querySelector(".add_tasks");
const editTask = document.querySelector("#edit");
const todosCreate = document.querySelector(".todos");
const modal = document.querySelector(".modal");
const addTodo = document.querySelector(".add_btn");
const editTodo = document.querySelector("#edits");
const dateTitle = document.querySelector(".date_title");
const menu = document.querySelector(".menu");
const menuPopUp = document.querySelector(".menu_popup");
const notification = document.querySelector(".notic");
const noticTemp = document.querySelector(".notic_temp");
const cancelEdit = document.querySelector("#cancel");
const loads = document.querySelector('.loads')
const body = document.querySelector('body')

let ediItemId;
// Add todos input textarea
addTodo.addEventListener("click", (e) => {
  e.preventDefault();
  activeTask.classList.toggle("active");
  let title = document.querySelector(".task_name").value;
  let desc = document.querySelector("textarea").value;

  if (title.length && desc.length) {
    todos.push({
      title: title,
      desc: desc,
      date: getTime(),
      completed: false,
    });
    setTodos();
    showTodos();
  } else {
    console.log("error");
  }
});

// Edit todos input
editTodo.addEventListener("click", (e) => {
  e.preventDefault();
  editTask.classList.toggle("active_edit");
  let title = document.querySelector("#task_edit").value;
  let desc = document.querySelector("#description_edit").value;

  todos.splice(ediItemId, 1, {
    title: title,
    desc: desc,
    date: getTime(),
    completed: false,
  });
  setTodos();
  showTodos();
});

document.addEventListener("keyup", (e) => {
  if (e.keyCode == 27) {
    noticTemp.classList.add("active");
    menuPopUp.classList.add("menu_popup");
    activeTask.classList.add("active");
  }
});

// Click btn add end cancel
addTask.addEventListener("click", () => {
  activeTask.classList.toggle("active");
  menuPopUp.classList.add("menu_active");
  noticTemp.classList.add("active");

  form.reset();
});

// Key ESC cancel
cancelEdit.addEventListener("click", (e) => {
  e.preventDefault();
  editTask.classList.toggle("active_edit");
  form.reset();
});
cancel.addEventListener("click", (e) => {
  e.preventDefault();
  activeTask.classList.toggle("active");
  form.reset();
});

// local
let todos = JSON.parse(localStorage.getItem("todos"))
  ? JSON.parse(localStorage.getItem("todos"))
  : [];
if (todos.length) showTodos();

function setTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Time
function getTime() {
  const now = new Date();
  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();
  return `${date}.${month}.${year}`;
}
getTime();

// Show todos
function showTodos() {
  let todos = JSON.parse(localStorage.getItem("todos"));
  todo.innerHTML = "";
  todos.forEach((item, i) => {
    todo.innerHTML += `
      <div class="todo_list">
        <div class="line"></div>
        <div class="todo_info">
        <div class="info">
            <div className="check">
              <input class="checkmark" type="checkbox"/>
            </div>
            <div className="item">
              <p class="title">${item.title}</p>
            <p class="desc">${item.desc}</p>
            <div class="todo_date">
              <i class="fa-regular fa-calendar-days"></i>
              <span>${item.date}</span>
            </div>  
            </div>
          </div>
          <div class="todo_box">
            <p>Inbox <i class="fa-solid fa-inbox"></i></p>
            <div class="edit_delete">
              <i class="fa-solid fa-pen" onclick=(edit(${i}))></i>
              <i class="fa-solid fa-trash" onclick=(deleteTodo(${i}))></i>
              <i class="fa-solid fa-ellipsis"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  if(todos.length){
    console.log('bor');
    loads.style.display = "none"
  } else{
    loads.style.display = "block";
  }
}

// Delete todo
function deleteTodo(id) {
  const deletedTodo = todos.filter((item, i) => {
    return i !== id;
  });
  todos = deletedTodo;
  setTodos();
  showTodos();
}

// Edit todo
function edit(id) {
  console.log(id);
  ediItemId = id;
  editOpen(id);
}

// edit Open
function editOpen() {
  editTask.classList.toggle("active_edit");
}

// menu
function menuTask() {
  menu.addEventListener("click", (e) => {
    e.preventDefault();
    menuPopUp.classList.toggle("menu_active");
    activeTask.classList.add("active");
    noticTemp.classList.add("active");
    body.classList.toggle('menu_hidden')
  });
}

// Notification
function noticTask() {
  notification.addEventListener("click", () => {
    menuPopUp.classList.add("menu_active");
    noticTemp.classList.toggle("active");
    activeTask.classList.add("active");
  });
}

dateTitle.innerHTML = getTime();
showTodos();
menuTask();
noticTask();
