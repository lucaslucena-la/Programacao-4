//============================
// 1. Seleção de Elementos DOM
//============================
const input = document.getElementById('search-input');   // campo de texto
const button = document.getElementById('search-button'); // botão de busca
const resultsDiv = document.getElementById('results');   // contêiner de resultados

//============================
// 2. Função assíncrona principal
//============================
async function buscarDados() {
  // Pega o valor digitado e remove espaços extras
  const valor = input.value.trim();

  // Validação simples
  if (!valor) {
    resultsDiv.textContent = "Digite no formato: Artista - Música";
    return;
  }

  // 3. Construção da URL (separa por "-")
  const [artist, title] = valor.split('-').map(s => s.trim());
  if (!artist || !title) {
    resultsDiv.textContent = "Formato inválido. Use: Artista - Música";
    return;
  }

  const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`;

  try {
    // 4. Requisição com fetch
    resultsDiv.textContent = "Buscando dados...";
    const response = await fetch(url);

    // Converte a resposta em JSON
    const dados = await response.json();

    // 5. Exibe os resultados
    exibirResultados(dados);

  } catch (error) {
    resultsDiv.textContent = "Erro ao buscar dados: " + error.message;
  }
}

//========================================
// 5. Função separada para exibir resultados
//========================================
function exibirResultados(dados) {
  // Limpa qualquer conteúdo anterior
  resultsDiv.innerHTML = "";

  // Mostra no console para inspecionar a estrutura
  console.log(dados);

  // Verifica se veio a letra da música
  if (dados.lyrics) {
    const letra = document.createElement('pre'); // preserva quebras de linha
    letra.textContent = dados.lyrics;
    resultsDiv.appendChild(letra);
  } else {
    const msg = document.createElement('p');
    msg.textContent = dados.error || "Não encontrado";
    resultsDiv.appendChild(msg);
  }
}

//========================================
// 6. Event Listeners
//========================================

// Clique no botão
button.addEventListener('click', buscarDados);

// Pressionar ENTER no input
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    buscarDados();
  }
});
