const inputNewTask = document.querySelector(".input-new-task");
const btnNewTask = document.querySelector(".add-new-task");
const tasksList = document.querySelector(".tasks-list");

inputNewTask.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    let task = {
      nome: inputNewTask.value,
      id: generateId(),
    };
    addTask(task);
  }
});

btnNewTask.addEventListener("click", (e) => {
  let task = {
    nome: inputNewTask.value,
    id: generateId(),
  };
  addTask(task);
});

function generateId() {
  return Math.floor(Math.random() * 1000);
}

function addTask(task) {
  let li = createTagLi(task);
  tasksList.appendChild(li);
  inputNewTask.value = "";
}

function createTagLi(task) {
  let li = document.createElement("li");
  li.id = task.id;

  let span = document.createElement("span");
  span.classList.add("text-task");
  span.innerHTML = task.nome;

  let div = document.createElement("div");

  let btnEdit = document.createElement("button");
  btnEdit.classList.add("icons-tasks-list");
  btnEdit.innerHTML = '<i class="fa-solid fa-pencil"></i>';
  btnEdit.setAttribute("onclick", "editTask(" + task.id + ")");

  let btnDelete = document.createElement("button");
  btnDelete.classList.add("icons-tasks-list");
  btnDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
  btnDelete.setAttribute("onclick", "deleteTask(" + task.id + ")");

  div.appendChild(btnEdit);
  div.appendChild(btnDelete);

  li.appendChild(span);
  li.appendChild(div);
  return li;
}

function editTask(idTask) {
  let li = document.getElementById("" + idTask + "");
  if (li) {
    li.firstChild.classList.toggle("completed");
  }
}

function deleteTask(idTask) {
  let confirmation = window.confirm("Realmente deseja excluir essa tarefa?");
  if (confirmation) {
    let li = document.getElementById("" + idTask + "");
    if (li) {
      tasksList.removeChild(li);
    }
  }
}
