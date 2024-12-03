document.addEventListener('DOMContentLoaded', () => {
    const cadastrarProdutoBtn = document.getElementById('cadastrarProduto');
    const modalCadastro = document.getElementById('modalCadastro');
    const fecharModal = document.getElementById('fecharModal');
    const formCadastroProduto = document.getElementById('formCadastroProduto');
    const listaProdutos = document.getElementById('listaProdutos');
    const listaPedidos = document.getElementById('listaPedidos');

    // Abrir o modal de cadastro de produto
    cadastrarProdutoBtn.addEventListener('click', () => {
        modalCadastro.style.display = 'flex';
    });

    // Fechar o modal de cadastro
    fecharModal.addEventListener('click', () => {
        modalCadastro.style.display = 'none';
    });

    // Cadastro de produto
    formCadastroProduto.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const nomeProduto = document.getElementById('nomeProduto').value;
        const precoProduto = document.getElementById('precoProduto').value;
        const imagemProduto = document.getElementById('imagemProduto').value; // Agora pega o valor do link
    
        if (!imagemProduto) {
            alert('O link da imagem do produto é obrigatório');
            return;
        }
    
        const produto = {
            nomeProduto,
            precoProduto,
            imagemProduto, // Inclui o link diretamente no objeto
        };
    
        try {
            const response = await fetch('/produtos/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produto),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                carregarProdutos(); // Atualiza a lista de produtos
                modalCadastro.style.display = 'none'; // Fecha o modal
            } else {
                alert(data.message || 'Erro ao cadastrar produto');
            }
        } catch (error) {
            alert('Erro ao cadastrar produto');
            console.error(error);
        }
    });
    
    
    // Ajuste para exibir as imagens ao carregar os produtos
    async function carregarProdutos() {
        const response = await fetch('/produtos');
        const produtos = await response.json();
        listaProdutos.innerHTML = '';
        
        produtos.forEach(produto => {
            const produtoDiv = document.createElement('div');
            produtoDiv.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" style="width: 100px; height: auto;" />
                <p>${produto.nome} - R$${produto.preco}</p>
                <button class="editarProduto" data-id="${produto.id}">Editar</button>
                <button class="excluirProduto" data-id="${produto.id}">Excluir</button>
            `;
            listaProdutos.appendChild(produtoDiv);
        });
    }
    
    // Inicializa a lista de produtos e pedidos
    carregarProdutos();
    carregarPedidos();
});
