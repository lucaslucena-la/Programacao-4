// Exportamos cada função para que possam ser importadasindividualmente.

export const exibirProduto = (produto) => {
    console.log(`ID: ${produto.id}`);
    console.log(`Nome: ${produto.nome}`);
    console.log(`Preço: R$ ${produto.preco.toFixed(2)}`);
    console.log(`Em Estoque: ${produto.emEstoque ? 'Sim' : 'Não'}`);
    console.log(`Quantidade: ${produto.quantidade}`);
    console.log('-----------------------------');
};

export const listarProdutosEmEstoque = (inventario) => {
    console.log("--- Produtos em Estoque ---");
    inventario.forEach(produto => {
        if (produto.emEstoque && produto.quantidade > 0) {
            exibirProduto(produto);
        }
    });
};

export const calcularValorTotalInventario = (inventario) => {
    return inventario.reduce((total, produto) => {
        if (produto.emEstoque) {
            return total + (produto.preco * produto.quantidade);
        }
        return total;
    }, 0);
};