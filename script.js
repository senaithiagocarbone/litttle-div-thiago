// MOSTRAR SEÇÕES
function mostrar(secao) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.getElementById(secao).classList.add('active');

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
      document.getElementById('sqlPainel').classList.add('show');
      break;
  }
}

// DADOS DOS CURSOS
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

// FORMULÁRIO AUTOMÁTICO
const cursoSelect = document.getElementById("curso");
cursoSelect.addEventListener("change", () => {
  const curso = cursoSelect.value;
  if (dadosCursos[curso]) {
    document.getElementById("professor").value = dadosCursos[curso].prof;
    document.getElementById("turma").value = dadosCursos[curso].turma;
    document.getElementById("bloco").value = dadosCursos[curso].bloco;
    document.getElementById("sala").value = dadosCursos[curso].sala;
    document.getElementById("data").value = dadosCursos[curso].data;
    document.getElementById("horario").value = dadosCursos[curso].horario;
  } else {
    document.getElementById("professor").value = "";
    document.getElementById("turma").value = "";
    document.getElementById("bloco").value = "";
    document.getElementById("sala").value = "";
    document.getElementById("data").value = "";
    document.getElementById("horario").value = "";
  }
});

// RESERVAS
let reservas = [];

// ENVIO DO FORMULÁRIO
document.getElementById("reservaForm").addEventListener("submit", function(e){
  e.preventDefault();
  const curso = cursoSelect.value;
  if (!curso) return;
  const prof = document.getElementById("professor").value;
  const turma = document.getElementById("turma").value;
  const bloco = document.getElementById("bloco").value;
  const sala = document.getElementById("sala").value;
  const data = document.getElementById("data").value;
  const horario = document.getElementById("horario").value;

  reservas.push({curso, prof, turma, bloco, sala, data, horario});
  atualizarTabela();
  alert("Reserva registrada com sucesso!");
  document.getElementById("reservaForm").reset();
});

// ATUALIZAR TABELA
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

// FILTRO
function popularFiltro() {
  const filtro = document.getElementById("filtroCurso");
  filtro.innerHTML = '<option value="">Todos os cursos</option>';
  const cursosUnicos = [...new Set(reservas.map(r => r.curso))];
  cursosUnicos.forEach(c => {
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

  reservas.filter(r => {
    return (!cursoFiltro || r.curso === cursoFiltro) && (!dataFiltro || r.data === dataFiltro);
  }).forEach(r => {
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

// AJUSTE DE FONTE
let tamanhoFonte = 16;
function aumentarFonte() { tamanhoFonte += 2; document.body.style.fontSize = tamanhoFonte + "px"; }
function diminuirFonte() { if (tamanhoFonte > 10) { tamanhoFonte -= 2; document.body.style.fontSize = tamanhoFonte + "px"; } }

// GRÁFICO SIMPLES RELATÓRIOS
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
