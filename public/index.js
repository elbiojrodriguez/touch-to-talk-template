window.addEventListener('DOMContentLoaded', () => {
  // 🧩 Captura o caminho da URL (ex: /eduardo)
  const caminho = window.location.pathname;
  const partes = caminho.split('/').filter(Boolean);
  const nome = decodeURIComponent(partes[partes.length - 1] || 'Visitante');

  // 🔍 Pega os parâmetros da URL (ex: ?fone=...)
  const url = new URL(window.location.href);
  const telefone = url.searchParams.get("fone");

  // 🖊️ Exibe o nome na página
  const elementoNome = document.getElementById('nomeChamado');
  if (elementoNome) {
    elementoNome.innerHTML = `Você está tentando chamar: <strong>${nome}</strong>`;
  }

  // ☎️ Exibe o telefone, se existir
  if (telefone) {
    const info = document.createElement("p");
    info.textContent = `Número para chamada: +${telefone}`;
    document.body.appendChild(info);
  }

  // 🎥 Botão de chamada ativa câmera e microfone
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
