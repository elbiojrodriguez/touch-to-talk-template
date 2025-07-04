window.addEventListener('DOMContentLoaded', async () => {
  const caminho = window.location.pathname;
  const partes = caminho.split('/').filter(Boolean);
  const nomeSala = decodeURIComponent(partes[partes.length - 1] || 'default');

  const url = new URL(window.location.href);
  const telefone = url.searchParams.get("fone");

  const nomeElemento = document.getElementById("nomeChamado");
  if (nomeElemento) {
    nomeElemento.innerHTML = `Você está tentando chamar: <strong>${nomeSala}</strong>`;
  }

  if (telefone) {
    const info = document.createElement("p");
    info.textContent = `Número para chamada: +${telefone}`;
    document.body.appendChild(info);
  }

  const signalingServerURL = "https://doorvi-signaling-server.onrender.com";
  const socket = io(signalingServerURL);

  const botao = document.getElementById('botaoChamar');
  const videoLocal = document.getElementById('videoPreview');
  let streamLocal;
  let peerConnection;
  let isInitiator = false;

  const configRTC = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
  };

  botao.onclick = async () => {
    streamLocal = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoLocal.srcObject = streamLocal;
    socket.emit("join", nomeSala);
  };

  socket.on("ready", () => {
    isInitiator = true;
    iniciarPeer();
    enviarOffer();
  });

  socket.on("offer", async (offer) => {
    iniciarPeer();
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit("answer", { room: nomeSala, answer });
  });

  socket.on("answer", async ({ answer }) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  });

  socket.on("candidate", async ({ candidate }) => {
    try {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
      console.error("Erro ao adicionar ICE:", err);
    }
  });

  function iniciarPeer() {
    peerConnection = new RTCPeerConnection(configRTC);

    streamLocal.getTracks().forEach(track => {
      peerConnection.addTrack(track, streamLocal);
    });

    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        socket.emit("candidate", { room: nomeSala, candidate: event.candidate });
      }
    };

    peerConnection.ontrack = event => {
      const videoRemoto = document.createElement("video");
      videoRemoto.autoplay = true;
      videoRemoto.playsInline = true;
      videoRemoto.srcObject = event.streams[0];
      document.body.appendChild(videoRemoto);
    };
  }

  async function enviarOffer() {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("offer", { room: nomeSala, offer });
  }
});
