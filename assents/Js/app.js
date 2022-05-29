const inputNovaTarefa = document.querySelector(".input-nova-tarefa");
const btnAddTarefa = document.querySelector(".add-tarefa");
const novasTarefas = document.querySelector(".novas-tarefas");

function criandoNovaTarefa(inputText) {
  const li = document.createElement("li");
  li.innerHTML = inputText;
  novasTarefas.appendChild(li);
  criaBotaoApagar(li);
  salvandoTarefas();
}

function criaBotaoApagar(li) {
  li.innerText += " ";
  const botaoApagarTarefa = document.createElement("button");
  botaoApagarTarefa.innerText = "Apagar";
  botaoApagarTarefa.setAttribute("class", "apagar");
  li.appendChild(botaoApagarTarefa);
}

function salvandoTarefas() {
  const tarefasLi = novasTarefas.querySelectorAll("li");
  const listaDasTarefas = [];

  for (let tarefas of tarefasLi) {
    let textoDaTarefa = tarefas.innerText;
    textoDaTarefa = textoDaTarefa.replace("Apagar", "").trim();
    listaDasTarefas.push(textoDaTarefa);
  }

  const tarefasJson = JSON.stringify(listaDasTarefas);
  localStorage.setItem("tarefas", tarefasJson);
}
function recarregandoTarefaSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  const listaDasTarefas = JSON.parse(tarefas);

  for (let tarefa of listaDasTarefas) {
    criandoNovaTarefa(tarefa);
  }
}
recarregandoTarefaSalvas();

btnAddTarefa.addEventListener("click", function () {
  if (!inputNovaTarefa.value) return;
  criandoNovaTarefa(inputNovaTarefa.value);
  inputNovaTarefa.value = "";
  inputNovaTarefa.focus();
});

inputNovaTarefa.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    criandoNovaTarefa(inputNovaTarefa.value);
    inputNovaTarefa.value = "";
    inputNovaTarefa.focus();
  }
  document.addEventListener("click", function (event) {
    const element = event.target;

    if (element.classList.contains("apagar")) {
      element.parentElement.remove();
      salvandoTarefas();
    }
  });
});
