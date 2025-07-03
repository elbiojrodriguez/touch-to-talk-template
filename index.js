export default function Page({ params }) {
  const nome = decodeURIComponent(params.nome);
  return (
    <html>
      <head>
        <title>Chamar {nome}</title>
        <link rel="stylesheet" href="/style.css" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div class="container">
          <h1>Olá, você está chamando:</h1>
          <h2>{nome}</h2>
          <button onclick="alert('Chamando {nome}...')">Chamar</button>
        </div>
      </body>
    </html>
  );
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}
