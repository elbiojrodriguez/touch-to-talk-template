window.addEventListener('DOMContentLoaded', () => {
  // Captura o caminho da URL
  const caminho = window.location.pathname;

  // Divide a URL por barras e remove partes vazias
  const partes = caminho.split('/').filter(Boolean);

  // Pega o último segmento como nome
  const nome = decodeURIComponent(partes[partes.length - 1] || 'Visitante');

  // Insere o nome na página
  const elementoNome = document.getElementById('nomeChamado');
  if (elementoNome) {
    elementoNome.innerHTML = `Você está tentando chamar: <strong>${nome}</strong>`;
  }

  // Adiciona ação ao botão
  const botao = document.getElementById('botaoChamar');
  if (botao) {
    botao.onclick = () => {
      alert(`Chamando ${nome}...`);
    };
  }
});
