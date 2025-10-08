const cursos = {
  "Desenvolvimento de Sistemas": {
    vagas: 50,
    matriculados: 32,
    professores: [
      { nome: "Ricardo", dias: "Segunda e Terça", atividade: "Escrever" },
      { nome: "Osnir", dias: "Quarta-feira", atividade: "Banco de Dados" },
      { nome: "Luciana", dias: "Quinta-feira", atividade: "Visual Studio Code" },
      { nome: "Luciano", dias: "Sexta-feira", atividade: "Eletricidade do Computador" }
    ]
  },
  "Marcenaria": {
    vagas: 40,
    matriculados: 20,
    professores: [
      { nome: "Maycon", dias: "Segunda", atividade: "Escrever e Desenhar" },
      { nome: "Alex", dias: "Terça", atividade: "Cortar Madeiras" },
      { nome: "Diego", dias: "Quarta", atividade: "Montar Coisas" },
      { nome: "Cleber", dias: "Quinta", atividade: "Arrumar e Afiar Ferramenta" },
      { nome: "Sebastiana", dias: "Quinta e Sexta", atividade: "Criar Coisa Artesanal" }
    ]
  },
  "Mecânico de Carro": {
    vagas: 30,
    matriculados: 15,
    professores: [
      { nome: "Richard", dias: "Segunda", atividade: "Escrever e Fazer Contas" },
      { nome: "Darci", dias: "Terça", atividade: "Desmontar e Arrumar" },
      { nome: "Luci", dias: "Quarta", atividade: "Montar e Colocar no Lugar" },
      { nome: "Ruy", dias: "Quinta, Sexta e Sábado", atividade: "Colocar no Lugar" }
    ]
  },
  "Mecânico de Caminhão e Carros Grandes": {
    vagas: 25,
    matriculados: 10,
    professores: [
      { nome: "Felipe", dias: "Segunda", atividade: "Escrever e Desenhar" },
      { nome: "Gustavo", dias: "Terça e Quarta", atividade: "Desmontar e Arrumar" },
      { nome: "Delci", dias: "Quarta e Quinta", atividade: "Montar e Ver se Está Funcionando" },
      { nome: "Jona", dias: "Sexta e Sábado", atividade: "Colocar no Lugar e Ver se Deu Certo" }
    ]
  },
  "Administração": {
    vagas: 60,
    matriculados: 45,
    professores: [
      { nome: "João Pedro", dias: "Segunda", atividade: "Escrever" },
      { nome: "Pedro Roberto", dias: "Terça e Quarta", atividade: "Mexer com Dinheiro" },
      { nome: "Carlos", dias: "Quinta", atividade: "Mexer no Computador" },
      { nome: "Lucimara", dias: "Sexta", atividade: "Ver Empresas" }
    ]
  },
  "Logística": {
    vagas: 35,
    matriculados: 25,
    professores: [
      { nome: "Chico", dias: "Segunda e Terça", atividade: "Escrever" },
      { nome: "Bento", dias: "Quarta", atividade: "Fazer Contas" },
      { nome: "Francisco", dias: "Quinta", atividade: "Pesagem" },
      { nome: "Maria", dias: "Sexta", atividade: "Desenhar e Falar" }
    ]
  },
  "Engenharia Civil": {
    vagas: 45,
    matriculados: 38,
    professores: [
      { nome: "Francisca", dias: "Segunda", atividade: "Desenhar e Escrever" },
      { nome: "Marinalva", dias: "Terça e Quarta", atividade: "Montar" },
      { nome: "Higor", dias: "Quinta", atividade: "Falar e Fazer Contas" },
      { nome: "Ana Caroline", dias: "Sexta", atividade: "Montar e Falar se Ficou Bom" }
    ]
  },
  "Engenharia de Software": {
    vagas: 50,
    matriculados: 40,
    professores: [
      { nome: "Rafael", dias: "Segunda", atividade: "Escrever e Falar" },
      { nome: "Roberto", dias: "Terça", atividade: "Mexer no Computador" },
      { nome: "Alexandre", dias: "Quarta e Quinta", atividade: "Criar Coisa" },
      { nome: "Claudio", dias: "Sexta", atividade: "Eletricidade do Computador" }
    ]
  }
};

let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

document.getElementById("curso").addEventListener("change", function () {
  const curso = this.value;
  const profSelect = document.getElementById("professor");
  profSelect.innerHTML = "<option value=''>Selecione o professor</option>";

  if (cursos[curso]) {
    cursos[curso].professores.forEach(p => {
      let opt = document.createElement("option");
      opt.value = p.nome;
      opt.textContent = `${p.nome} (${p.dias} - ${p.atividade})`;
      profSelect.appendChild(opt);
    });
  }
});

document.getElementById("reservaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const novaReserva = {
    curso: document.getElementById("curso").value,
    professor: document.getElementById("professor").value,
    turma: document.getElementById("turma").value,
    data: document.getElementById("data").value,
    horario: document.getElementById("horario").value
  };

  reservas.push(novaReserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));
  carregarRelatorios();
  carregarTabelaReservas();
});

function carregarRelatorios() {
  const relDiv = document.getElementById("relatorios");
  relDiv.innerHTML = "";

  Object.keys(cursos).forEach(cursoNome => {
    const curso = cursos[cursoNome];
    const ocupacao = Math.round((curso.matriculados / curso.vagas) * 100);

    let cor = "green";
    if (ocupacao > 60 && ocupacao <= 80) cor = "orange";
    if (ocupacao > 80) cor = "red";

    const card = document.createElement("div");
    card.className = "relat-card";
    card.innerHTML = `
      <h3>${cursoNome}</h3>
      <p><strong>Matriculados:</strong> ${curso.matriculados}</p>
      <p><strong>Vagas restantes:</strong> ${curso.vagas - curso.matriculados}</p>
      <div class="progress">
        <div class="progress-bar" style="width:${ocupacao}%; background:${cor};">
          ${ocupacao}%
        </div>
      </div>
      <h4>Professores:</h4>
      <ul>
        ${curso.professores.map(p => `
          <li>
            <span class="professor-tag professor-${p.nome.replace(/\s/g,'')}">${p.nome} - ${p.dias} (${p.atividade})</span>
          </li>`).join("")}
      </ul>
    `;
    relDiv.appendChild(card);
  });
}

function carregarTabelaReservas() {
  const tabelaDiv = document.getElementById("tabelaReservas");
  tabelaDiv.innerHTML = "";

  let tabelaHTML = `<table>
    <tr>
      <th>Curso</th><th>Professor</th><th>Turma</th><th>Data</th><th>Horário</th>
    </tr>`;
  reservas.forEach(r => {
    tabelaHTML += `<tr>
      <td>${r.curso}</td>
      <td>${r.professor}</td>
      <td>${r.turma}</td>
      <td>${r.data}</td>
      <td>${r.horario}</td>
    </tr>`;
  });
  tabelaHTML += "</table>";
  tabelaDiv.innerHTML = tabelaHTML;
}

carregarRelatorios();
carregarTabelaReservas();
