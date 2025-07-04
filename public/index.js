const caminho = window.location.pathname;
const partes = caminho.split('/');
const nome = decodeURIComponent(partes[partes.length - 1] || 'Visitante');

document.getElementById('nomeChamado').innerHTML = `Você está tentando chamar: <strong>${nome}</strong>`;
document.getElementById('botaoChamar').onclick = function() {
  alert(`Chamando ${nome}...`);
};
