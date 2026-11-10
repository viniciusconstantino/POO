let turmas = [];
let alunos = [];

function salvarTurma() {
  let nome = document.getElementById("turma-nome").value;
  let curso = document.getElementById("turma-curso").value;
  let professor = document.getElementById("turma-professor").value;

  if (nome == "" || curso == "" || professor == "") {
    alert("Preencha todos os campos!");
    return;
  }

  let novaTurma = new Turma(nome, curso, professor);

  turmas.push(novaTurma);
  atualizarTurmas();
  listarTurmas();

  alert("Turma cadastrada com sucesso!");

  document.getElementById("turma-nome").value = "";
  document.getElementById("turma-curso").value = "";
  document.getElementById("turma-professor").value = "";
}

function mostrarTurmas() {
  document.getElementById("tab-turmas").style.display = "block";
  document.getElementById("tab-cadastrar").style.display = "none";
  document.getElementById("tab-listar").style.display = "none";
}

function mostrarCadastroAluno() {
  if (turmas.length == 0) {
    alert("Cadastre uma turma antes de cadastrar alunos!");
    return;
  }

  document.getElementById("tab-turmas").style.display = "none";
  document.getElementById("tab-cadastrar").style.display = "block";
  document.getElementById("tab-listar").style.display = "none";
}

function listarAlunos() {

  // Mostra a aba de alunos
  document.getElementById("tab-turmas").style.display = "none";
  document.getElementById("tab-cadastrar").style.display = "none";
  document.getElementById("tab-listar").style.display = "block";

  let lista = "<table border='1'>";

  lista += "<tr>";
  lista += "<th>Nome</th>";
  lista += "<th>Nota 1</th>";
  lista += "<th>Nota 2</th>";
  lista += "<th>Nota 3</th>";
  lista += "<th>Média</th>";
  lista += "<th>Situação</th>";
  lista += "<th>Ações</th>";
  lista += "</tr>";

  // Percorre os alunos cadastrados
  for (let i = 0; i < alunos.length; i++) {

    let aluno = alunos[i];

    let media = aluno.gerarMedia();
    let estado = aluno.gerarEstado();

    lista += "<tr>";

    lista += "<td>" + aluno.nome + "</td>";
    lista += "<td>" + aluno.getNota1() + "</td>";
    lista += "<td>" + aluno.getNota2() + "</td>";
    lista += "<td>" + aluno.getNota3() + "</td>";
    lista += "<td>" + media.toFixed(2) + "</td>";
    lista += "<td>" + estado + "</td>";
    lista += "<td><button onclick='editarNotas(" + i + ")'>Editar Notas</button></td>";

    lista += "</tr>";
  }

  lista += "</table>";

  document.getElementById("alunos").innerHTML = lista;
}

function editarNotas(i) {

  let aluno = alunos[i];

  let n1 = prompt("Nova Nota 1:", aluno.getNota1());
  if (n1 === null) return;

  let n2 = prompt("Nova Nota 2:", aluno.getNota2());
  if (n2 === null) return;

  let n3 = prompt("Nova Nota 3:", aluno.getNota3());
  if (n3 === null) return;

  // Verifica se as notas são válidas
  if (
    n1.trim() == "" ||
    n2.trim() == "" ||
    n3.trim() == "" ||
    isNaN(Number(n1)) ||
    isNaN(Number(n2)) ||
    isNaN(Number(n3)) ||
    Number(n1) < 0 || Number(n1) > 10 ||
    Number(n2) < 0 || Number(n2) > 10 ||
    Number(n3) < 0 || Number(n3) > 10
  ) {
    alert("Digite notas válidas entre 0 e 10!");
    return;
  }

  // Altera as notas pelos métodos set
  aluno.setNota1(Number(n1));
  aluno.setNota2(Number(n2));
  aluno.setNota3(Number(n3));

  alert("Notas alteradas com sucesso!");

  listarAlunos();
}

function salvarAluno() {

  // Pegando os dados do HTML
  let nome = document.getElementById("nome").value;

  let turmaSelecionada = document.getElementById("turma-aluno").value;

  let n1 = Number(document.getElementById("n1").value);
  let n2 = Number(document.getElementById("n2").value);
  let n3 = Number(document.getElementById("n3").value);

  // Verificando se existe alguma turma
  if (turmas.length == 0) {
    alert("Cadastre uma turma primeiro!");
    return;
  }

  // Verificando os campos
  if (nome.trim() == "" || turmaSelecionada == "") {
    alert("Preencha o nome e selecione uma turma!");
    return;
  }

  // Verificando as notas
  if (
    document.getElementById("n1").value == "" ||
    document.getElementById("n2").value == "" ||
    document.getElementById("n3").value == "" ||
    n1 < 0 || n1 > 10 ||
    n2 < 0 || n2 > 10 ||
    n3 < 0 || n3 > 10
  ) {
    alert("Digite as três notas entre 0 e 10!");
    return;
  }

  // Criando o aluno
  let novoAluno = new Aluno(nome, n1, n2, n3);

  // Adicionando o aluno à turma escolhida
  let posicao = Number(turmaSelecionada);

  turmas[posicao].adicionarAluno(novoAluno);

  // Guardando o aluno na lista
  alunos.push(novoAluno);

  alert("Aluno cadastrado com sucesso!");

  // Limpando os campos
  document.getElementById("nome").value = "";
  document.getElementById("n1").value = "";
  document.getElementById("n2").value = "";
  document.getElementById("n3").value = "";

}

function atualizarTurmas() {

  let select = document.getElementById("turma-aluno");

  select.innerHTML = '<option value="">Selecione uma turma</option>';

  for (let i = 0; i < turmas.length; i++) {

    select.innerHTML +=
      '<option value="' + i + '">' +
      turmas[i].nome +
      '</option>';

  }
}


function listarTurmas() {

  let lista = document.getElementById("lista-turmas");

  // Limpa a listagem anterior
  lista.innerHTML = "";

  // Verifica se existem turmas
  if (turmas.length == 0) {
    lista.textContent = "Nenhuma turma cadastrada.";
    return;
  }

  // Percorre as turmas cadastradas
  for (let i = 0; i < turmas.length; i++) {

    let turma = turmas[i];

    let texto = document.createElement("p");

    texto.textContent =
      "Turma: " + turma.nome +
      " | Curso: " + turma.curso +
      " | Professor: " + turma.professor;

    lista.appendChild(texto);
  }
}
