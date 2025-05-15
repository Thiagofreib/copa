document.addEventListener("DOMContentLoaded", () => {
    const tabela = document.querySelector("#tabela tbody");
  
    function atualizarTabela() {
      const linhas = Array.from(tabela.querySelectorAll("tr"));
  
      linhas.forEach(linha => {
        const inputs = linha.querySelectorAll("input[type='number']");
        const v = parseInt(inputs[0].value) || 0;
        const e = parseInt(inputs[1].value) || 0;
        const d = parseInt(inputs[2].value) || 0;
        const gp = parseInt(inputs[3].value) || 0;
        const gc = parseInt(inputs[4].value) || 0;
  
        const pts = (v * 3) + e;
        const j = v + e + d;
        const sg = gp - gc;
  
        linha.cells[1].textContent = pts;
        linha.cells[2].textContent = j;
        linha.cells[8].textContent = sg;
      });
  
      const novasLinhas = linhas.sort((a, b) => {
        const ptsA = parseInt(a.cells[1].textContent);
        const ptsB = parseInt(b.cells[1].textContent);
        const sgA = parseInt(a.cells[8].textContent);
        const sgB = parseInt(b.cells[8].textContent);
  
        if (ptsB !== ptsA) return ptsB - ptsA;
        return sgB - sgA;
      });
  
      novasLinhas.forEach((linha, index) => {
        linha.classList.remove("lider");
        const nomeTime = linha.querySelector("td");
        if (nomeTime) {
          const iconeExistente = nomeTime.querySelector("span.trofeu");
          if (iconeExistente) iconeExistente.remove();
        }
  
        if (index === 0) {
          linha.classList.add("lider");
          const icone = document.createElement("span");
          icone.textContent = " 🏆";
          icone.className = "trofeu";
          if (nomeTime) nomeTime.appendChild(icone);
        }
  
        tabela.appendChild(linha);
      });
    }
  
    tabela.querySelectorAll("input").forEach(input => {
      input.addEventListener("input", atualizarTabela);
    });
  });

  




  const db = firebase.database();
const tabela = document.querySelector("#tabela tbody");

// Lista dos times, na ordem das linhas
const times = [
  "Atletico de Madrid",
  "Barcelona",
  "Liverpool",
  "Bayern München",
  "Manchester City",
  "PSG"
];

// Atualiza o Firebase quando um input mudar
tabela.addEventListener("input", (e) => {
  const linha = e.target.closest("tr");
  const index = [...tabela.rows].indexOf(linha);
  const time = times[index];

  const V = parseInt(linha.cells[3].querySelector("input").value) || 0;
  const E = parseInt(linha.cells[4].querySelector("input").value) || 0;
  const D = parseInt(linha.cells[5].querySelector("input").value) || 0;
  const GP = parseInt(linha.cells[6].querySelector("input").value) || 0;
  const GC = parseInt(linha.cells[7].querySelector("input").value) || 0;

  const J = V + E + D;
  const PTS = V * 3 + E;
  const SG = GP - GC;

  // Atualiza células calculadas
  linha.cells[1].textContent = PTS;
  linha.cells[2].textContent = J;
  linha.cells[8].textContent = SG;

  // Envia para o Firebase
  db.ref("tabela/" + time).set({ V, E, D, GP, GC });
});

// Sincroniza em tempo real com Firebase
times.forEach((time, index) => {
  const linha = tabela.rows[index];
  db.ref("tabela/" + time).on("value", (snapshot) => {
    const dados = snapshot.val();
    if (dados) {
      const { V = 0, E = 0, D = 0, GP = 0, GC = 0 } = dados;

      const J = V + E + D;
      const PTS = V * 3 + E;
      const SG = GP - GC;

      linha.cells[1].textContent = PTS;
      linha.cells[2].textContent = J;
      linha.cells[3].querySelector("input").value = V;
      linha.cells[4].querySelector("input").value = E;
      linha.cells[5].querySelector("input").value = D;
      linha.cells[6].querySelector("input").value = GP;
      linha.cells[7].querySelector("input").value = GC;
      linha.cells[8].textContent = SG;
    }
  });
});

  