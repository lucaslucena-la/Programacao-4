// 1. Importar os dados e as funções necessárias
import { inventarioLoja } from './dados.js';
import {
    exibirProduto,
    listarProdutosEmEstoque,
    calcularValorTotalInventario
} from './funcoes.js';

// 2. Executar o código de teste
console.log("--- Executando o programa modular-- -");

listarProdutosEmEstoque(inventarioLoja);

const valorTotal = calcularValorTotalInventario(inventarioLoja);
console.log("\n--- Valor Total do Inventário ---");
console.log(`R$ ${valorTotal.toFixed(2)}`);