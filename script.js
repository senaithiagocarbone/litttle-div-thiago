// ======== MOSTRAR SEÇÕES ========
function mostrar(secao) {
  // Esconde todas as seções
  document.querySelectorAll('section').forEach(s => s.classList.remove('ativo'));
  // Mostra a seção selecionada
  document.getElementById(secao).classList.add('ativo');

  const descricao = document.getElementById('descricaoBotao');
  switch (secao) {
    case 'formulario':
      descricao.textContent = '🗓️ Este botão abre o formulário para registrar novas reservas de sala.';
      break;
    case 'relatorios':
      descricao.textContent = '📊 Este botão mostra os relatórios e estatísticas dos cursos.';
      renderizarGrafico();
      break;
    case 'significados':
      descricao.textContent = '📚 Este botão exibe o significado e a descrição de cada curso.';
      break;
    case 'tabela':
      descricao.textContent = '📅 Este botão mostra todas as reservas já registradas.';
      atualizarTabela();
      break;
    case 'config':
      descricao.textContent = '⚙️ Este botão abre as configurações do sistema.';
      break;
  }
}

// ======== DADOS DOS CURSOS ========
const dadosCursos = {
  "Desenvolvimento de Sistemas": {prof: "Ricardo", turma:"A", bloco:"1", sala:"101", data:"2025-11-01", horario:"09:00"},
  "Marcenaria": {prof: "Ana", turma:"B", bloco:"2", sala:"202", data:"2025-11-02", horario:"10:00"},
  "Mecânico de Carro": {prof: "Lucas", turma:"C", bloco:"1", sala:"103", data:"2025-11-03", horario:"11:00"},
  "Mecânico de Caminhão e Carros Grandes": {prof: "Carlos", turma:"D", bloco:"2", sala:"204", data:"2025-11-04", horario:"13:00"},
  "Administração": {prof: "Sofia", turma:"E", bloco:"3", sala:"301", data:"2025-11-05", horario:"14:00"},
  "Logística": {prof: "Matheus", turma:"F", bloco:"3", sala:"302", data:"2025-11-06", horario:"08:00"},
  "Engenharia Civil": {prof: "Roberto", turma:"G", bloco:"4", sala:"401", data:"2025-11-07", horario:"09:30"},
  "Engenharia de Software": {prof: "Gabriel", turma:"H", bloco:"4", sala:"402", data:"2025-11-08", horario:"10:30"},
  "Enfermagem": {prof: "Mariana", turma:"I", bloco:"5", sala:"501", data:"2025-11-09", horario:"12:00"},
  "Inteligência Artificial": {prof: "Eduardo", turma:"J", bloco:"5", sala:"502", data:"2025-11-10", horario:"13:30"},
  "Eletricista de Carro": {prof: "Fábio", turma:"K", bloco:"6", sala:"601", data:"2025-11-11", horario:"08:30"},
  "Eletricista de Casa": {prof: "Paulo", turma:"L", bloco:"6", sala:"602", data:"2025-11-12", horario:"09:15"},
  "Chapeador de Carro": {prof: "Rafael", turma:"M", bloco:"7", sala:"701", data:"2025-11-13", horario:"10:45"}
};

// ======== FORMULÁRIO AUTOMÁTICO ========
const cursoSelect = document.getElementById("curso");
cursoSelect.addEventListener("change", () => {
  const curso = cursoSelect.value;
  if (dadosCursos[curso]) {
    const dados = dadosCursos[curso];
    ["professor","turma","bloco","sala","data","horario"].forEach(id => {
      document.getElementById(id).value = dados[id === "professor" ? "prof" : id];
    });
  } else {
    ["professor","turma","bloco","sala","data","horario"].forEach(id => document.getElementById(id).value = "");
  }
});

// ======== RESERVAS ========
let reservas = [];

document.getElementById("reservaForm").addEventListener("submit", function(e){
  e.preventDefault();
  const curso = cursoSelect.value;
  if (!curso) return;

  const r = {
    curso,
    prof: document.getElementById("professor").value,
    turma: document.getElementById("turma").value,
    bloco: document.getElementById("bloco").value,
    sala: document.getElementById("sala").value,
    data: document.getElementById("data").value,
    horario: document.getElementById("horario").value
  };

  reservas.push(r);
  atualizarTabela();
  alert("Reserva registrada com sucesso!");
  document.getElementById("reservaForm").reset();
});

// ======== ATUALIZAR TABELA ========
function atualizarTabela() {
  const tabela = document.getElementById("tabelaReservas");
  tabela.innerHTML = "<tr><th>Curso</th><th>Professor</th><th>Turma</th><th>Bloco</th><th>Sala</th><th>Data</th><th>Horário</th></tr>";
  reservas.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${r.curso}</td><td>${r.prof}</td><td>${r.turma}</td><td>${r.bloco}</td><td>${r.sala}</td><td>${r.data}</td><td>${r.horario}</td>`;
    tabela.appendChild(tr);
  });
  popularFiltro();
}

// ======== FILTRO ========
function popularFiltro() {
  const filtro = document.getElementById("filtroCurso");
  filtro.innerHTML = '<option value="">Todos os cursos</option>';
  [...new Set(reservas.map(r => r.curso))].forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    filtro.appendChild(opt);
  });
}

function aplicarFiltro() {
  const cursoFiltro = document.getElementById("filtroCurso").value;
  const dataFiltro = document.getElementById("filtroData").value;
  const tabela = document.getElementById("tabelaReservas");
  tabela.innerHTML = "<tr><th>Curso</th><th>Professor</th><th>Turma</th><th>Bloco</th><th>Sala</th><th>Data</th><th>Horário</th></tr>";

  reservas
    .filter(r => (!cursoFiltro || r.curso === cursoFiltro) && (!dataFiltro || r.data === dataFiltro))
    .forEach(r => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${r.curso}</td><td>${r.prof}</td><td>${r.turma}</td><td>${r.bloco}</td><td>${r.sala}</td><td>${r.data}</td><td>${r.horario}</td>`;
      tabela.appendChild(tr);
    });
}

function limparFiltro() {
  document.getElementById("filtroCurso").value = "";
  document.getElementById("filtroData").value = "";
  atualizarTabela();
}

// ======== AJUSTE DE FONTE GLOBAL ========
const sistema = document.body;
let tamanhoFonte = 16;

function aplicarFonte() {
  sistema.style.fontSize = tamanhoFonte + "px"; // transição no CSS fará a animação
}

function aumentarFonte() {
  tamanhoFonte += 2;
  aplicarFonte();
}

function diminuirFonte() {
  tamanhoFonte -= 2;
  aplicarFonte();
}

// Inicializa fonte
aplicarFonte();

// ======== GRÁFICO SIMPLES ========
function renderizarGrafico() {
  const rel = document.getElementById("relatoriosConteudo");
  const resumo = {};
  reservas.forEach(r => {
    resumo[r.curso] = (resumo[r.curso] || 0) + 1;
  });
  let html = "<h3 style='text-align:center;'>Número de Reservas por Curso</h3><ul>";
  for (const curso in resumo) {
    html += `<li>${curso}: ${resumo[curso]}</li>`;
  }
  html += "</ul>";
  rel.innerHTML = html;
}
