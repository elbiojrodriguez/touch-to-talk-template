// 🟢 Quando a página terminar de carregar...
window.addEventListener('DOMContentLoaded', () => {
  // 🧩 Extrai o nome da rota da URL (ex: /eduardo)
  const caminho = window.location.pathname;
  const partes = caminho.split('/').filter(Boolean);
  const nome = decodeURIComponent(partes[partes.length - 1] || 'Visitante');

  // 🔍 Extrai o número de telefone da URL (ex: ?fone=...)
  const url = new URL(window.location.href);
  const telefone = url.searchParams.get("fone");

  // 🖊️ Mostra o nome na página
  const elementoNome = document.getElementById('nomeChamado');
  if (elementoNome) {
    elementoNome.innerHTML = `Você está tentando chamar: <strong>${nome}</strong>`;
  }

  // ☎️ Mostra o telefone, se vier na URL
  if (telefone) {
    const info = document.createElement("p");
    info.textContent = `Número para chamada: +${telefone}`;
    document.body.appendChild(info);
  }

  // 🎥 Ativa câmera/microfone quando clicar no botão
  const botao = document.getElementById('botaoChamar');
  if (botao) {
    botao.onclick = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        // Mostra vídeo local na tela
        const video = document.getElementById('videoPreview');
        if (video) {
          video.srcObject = stream;
        }

        // Em breve: envia esse stream para outro navegador via WebRTC 🧠
      } catch (err) {
        alert("Permissão negada ou erro ao acessar câmera/microfone.");
        console.error("Erro ao acessar mídia:", err);
      }
    };
  }
});
