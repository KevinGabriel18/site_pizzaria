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
        const imagemProduto = document.getElementById('imagemProduto').value;
    
        const produto = {
            nomeProduto,
            precoProduto,
            imagemProduto,
        };
    
        try {
            const response = await fetch('/produtos/cadastrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produto),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert(data.message);
                carregarProdutos(); // Atualiza a lista de produtos
                modalCadastro.style.display = 'none';
            } else {
                alert(data.message || 'Erro ao cadastrar produto');
            }
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar produto.');
        }
    });
    
    
    // Ajuste para exibir as imagens ao carregar os produtos
    async function carregarProdutos() {
        try {
            const response = await fetch('/produtos');
            const produtos = await response.json();
            listaProdutos.innerHTML = '';
    
            produtos.forEach((produto) => {
                const produtoDiv = document.createElement('div');
                produtoDiv.innerHTML = `
                    <img src="${produto.imagem}" alt="${produto.nome}" style="width: 100px; height: auto;" />
                    <p>${produto.nome} - R$ ${produto.preco.toFixed(2)}</p>
                    <button class="editarProduto" data-id="${produto.id}">Editar</button>
                    <button class="excluirProduto" data-id="${produto.id}">Excluir</button>
                `;
                listaProdutos.appendChild(produtoDiv);
            });
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    }
    
    
    // Inicializa a lista de produtos e pedidos
    carregarProdutos();
   
});

function carregarPedidos() {
    fetch('/api/pedidos')
        .then(response => response.json())
        .then(pedidos => {
            const listaPedidos = document.getElementById('listaPedidos');
            listaPedidos.innerHTML = '';

            pedidos.forEach(pedido => {
                const pedidoDiv = document.createElement('div');
                pedidoDiv.className = 'pedido';
                pedidoDiv.innerHTML = `
                    <h3>Pedido #${pedido.id}</h3>
                    <p>Total: R$ ${pedido.total.toFixed(2)}</p>
                    <ul>
                        ${pedido.itens.map(item => `
                            <li>${item.nome} - Qtd: ${item.quantidade} - R$ ${item.preco.toFixed(2)}</li>
                        `).join('')}
                    </ul>
                    <hr>
                `;
                listaPedidos.appendChild(pedidoDiv);
            });
        })
        .catch(err => {
            console.error('Erro ao carregar os pedidos:', err);
        });
}

// Chame carregarPedidos() ao carregar o dashboard
