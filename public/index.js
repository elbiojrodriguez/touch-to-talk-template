window.addEventListener('DOMContentLoaded', () => {
  // Captura o caminho da URL
  const caminho = window.location.pathname;
  const partes = caminho.split('/').filter(Boolean);
  const nome = decodeURIComponent(partes[partes.length - 1] || 'Visitante');

  // Insere o nome na página
  const elementoNome = document.getElementById('nomeChamado');
  if (elementoNome) {
    elementoNome.innerHTML = `Você está tentando chamar: <strong>${nome}</strong>`;
  }

  // Botão de chamada
  const botao = document.getElementById('botaoChamar');
  if (botao) {
    botao.onclick = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const video = document.getElementById('videoPreview');
        if (video) {
          video.srcObject = stream;
        }
      } catch (err) {
        alert("Permissão negada ou erro ao acessar câmera/microfone.");
        console.error("Erro ao acessar mídia:", err);
      }
    };
  }
});
