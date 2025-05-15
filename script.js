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
  