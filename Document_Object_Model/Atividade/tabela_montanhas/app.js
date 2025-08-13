"use strict"; // Ativa o modo estrito do JavaScript (previne alguns erros silenciosos).

/* =========================
   Dados iniciais do exercício
   ========================= */
const MONTANHAS = [ // Declara um array constante com objetos representando montanhas.
    { nome: "Kilimanjaro", altura: 5895, local: "Tanzania" },  // Cada objeto tem nome, altura (número) e local.
    { nome: "Everest", altura: 8848, local: "Nepal" },
    { nome: "Monte Fuji", altura: 3776, local: "Japan" },
    { nome: "Vaalserberg", altura: 323, local: "Netherlands" },
    { nome: "Denali", altura: 6168, local: "USA" },
    { nome: "Popocatepetl", altura: 5465, local: "Mexico" },
    { nome: "Mont Blanc", altura: 4808, local: "Italy/France" }
];

/* =========================
   Utilitário rápido p/ criar elemento
   ========================= */
function el(tag, attrs = {}, ...children) {        // Função helper para criar elementos DOM de forma compacta.
    const $el = document.createElement(tag);       // Cria o elemento pela tag (ex.: "td", "tr", "table").
    Object.keys(attrs).forEach(k => $el.setAttribute(k, attrs[k])); // Aplica atributos (ex.: id, class, aria-*).
    children.forEach(ch => {                       // Itera pelos filhos passados como parâmetros variáveis.
        if (ch == null) return;                    // Ignora nulos/indefinidos.
        $el.appendChild(typeof ch === "string"     // Se for string, cria um nó de texto; senão, assume que já é um nó.
            ? document.createTextNode(ch)
            : ch);
    });
    return $el;                                    // Retorna o elemento pronto para uso.
}

/* =========================
   Renderização da Tabela
   - Colunas derivadas de Object.keys do 1º objeto
   - Linhas criadas com forEach
   - Células numéricas recebem classe 'numeric'
   ========================= */
function renderTabela(data) {                              // Recebe um array de objetos e desenha a tabela.
    const container = document.getElementById("mountains");// Pega o contêiner onde a tabela será inserida.
    container.replaceChildren();                           // Limpa o conteúdo anterior do contêiner (seguro e performático).

    if (!Array.isArray(data) || data.length === 0) {       // Se não for array ou estiver vazio...
        container.appendChild(el("p", {}, "Nenhuma montanha cadastrada.")); // Mostra uma mensagem.
        return;                                            // Interrompe a função.
    }

    // Colunas a partir do primeiro objeto
    const colunas = Object.keys(data[0]);                  // Deriva os nomes das colunas pelas chaves do primeiro objeto.

    // THEAD
    const thead = document.createElement("thead");         // Cria a seção de cabeçalho da tabela.
    const trHead = document.createElement("tr");           // Cria a linha de cabeçalho.
    colunas.forEach(col => {                               // Para cada coluna...
        const th = document.createElement("th");           // Cria uma célula de cabeçalho (th).
        th.textContent = col.charAt(0).toUpperCase() + col.slice(1); // Capitaliza a primeira letra (ex.: nome -> Nome).
        trHead.appendChild(th);                            // Anexa a célula à linha de cabeçalho.
    });
    thead.appendChild(trHead);                             // Anexa a linha ao thead.

    // TBODY
    const tbody = document.createElement("tbody");         // Cria a seção de corpo da tabela.
    data.forEach(item => {                                 // Para cada objeto (montanha) no array...
        const tr = document.createElement("tr");           // Cria uma linha da tabela.
        colunas.forEach(col => {                           // Para cada coluna definida...
            const valor = item[col];                       // Pega o valor correspondente no objeto (ex.: item["nome"]).
            const td = document.createElement("td");       // Cria uma célula de dados (td).
            // Alinha números à direita (CSS via classe)
            if (typeof valor === "number" && !Number.isNaN(valor)) { // Verifica se o valor é numérico válido.
                td.classList.add("numeric");               // Adiciona classe para alinhar à direita via CSS.
            }
            td.textContent = String(valor);                // Define o conteúdo textual da célula (converte para string).
            tr.appendChild(td);                            // Anexa a célula à linha atual.
        });
        tbody.appendChild(tr);                             // Anexa a linha completa ao corpo da tabela.
    });

    // Monta tabela
    const table = document.createElement("table");         // Cria o elemento <table>.
    table.appendChild(thead);                              // Anexa o cabeçalho.
    table.appendChild(tbody);                              // Anexa o corpo.

    // Injeta no container #mountains
    container.appendChild(table);                          // Insere a tabela pronta no contêiner da página.
}

/* =========================
   Formulário: adicionar nova montanha
   - addEventListener('submit', ...)
   - preventDefault()
   - valida altura com isNaN()
   - exibe erro em #errorMessage
   ========================= */
function setupForm() {                                     // Configura o comportamento do formulário.
    const form = document.getElementById("mountainForm");  // Seleciona o formulário pelo id.
    const errorBox = document.getElementById("errorMessage"); // Div onde mostramos mensagens de erro.
    const $nome = document.getElementById("nome");         // Campo de entrada: nome.
    const $altura = document.getElementById("altura");     // Campo de entrada: altura.
    const $local = document.getElementById("local");       // Campo de entrada: local.

    form.addEventListener("submit", (event) => {           // Ouve o evento de envio do formulário.
        event.preventDefault();                            // Cancela o envio padrão (evita recarregar a página).
        errorBox.classList.remove("show");                 // Esconde a mensagem de erro (se estiver visível).
        errorBox.textContent = "";                         // Limpa o texto da mensagem de erro.

        const nome = $nome.value.trim();                   // Lê e remove espaços extras do nome.
        const alturaStr = $altura.value.trim();            // Lê a altura como string (vamos validar).
        const local = $local.value.trim();                 // Lê e remove espaços extras do local.

        // Validação de número: isNaN
        const alturaNum = Number(alturaStr);               // Converte a altura para número.
        if (alturaStr === "" || Number.isNaN(alturaNum)) { // Se vazio ou não for número válido...
            errorBox.textContent = 'Erro: o campo "Altura (m)" deve ser um número válido.'; // Define mensagem de erro.
            errorBox.classList.add("show");                // Mostra a mensagem (CSS cuida do estilo vermelho).
            return;                                        // Interrompe o envio/adiciona.
        }

        if (!nome || !local) {                             // Checa se nome e local foram preenchidos.
            errorBox.textContent = "Preencha todos os campos."; // Mensagem de campos obrigatórios.
            errorBox.classList.add("show");                // Mostra a mensagem.
            return;                                        // Interrompe a ação.
        }

        // Adiciona no array e re-renderiza
        MONTANHAS.push({ nome, altura: alturaNum, local }); // Insere o novo objeto no array de montanhas.
        renderTabela(MONTANHAS);                            // Recria a tabela com a nova linha incluída.

        // Limpa formulário e foca no primeiro campo
        form.reset();                                      // Reseta os campos do formulário.
        $nome.focus();                                     // Coloca o foco de volta no campo "nome" (melhor UX).
    });
}

/* =========================
   Inicialização
   ========================= */
document.addEventListener("DOMContentLoaded", () => { // Aguarda o carregamento completo do DOM.
    renderTabela(MONTANHAS);                          // Renderiza a tabela inicial com os dados fornecidos.
    setupForm();                                      // Ativa os eventos e validações do formulário.
});
