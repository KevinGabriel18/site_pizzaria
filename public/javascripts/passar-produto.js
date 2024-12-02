function selecionarprod(produto) {
    const ElementPrice = document.getElementsByClassName(`preco-${produto}`);
    const ElementName = document.getElementById(`info-${produto}`);


    let productPrice = parseFloat(ElementPrice[0].innerText.replace("R$", "").replace(",", ".").trim())
    let productDetalhes = ElementName.innerText.trim();

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    let novoProduto = {
        id: produto,
        nome: productDetalhes,
        preco: productPrice,
        quantidade: 1
    };

    let produtoExistente = carrinho.find(item => item.id === produto);
    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push(novoProduto);
    }


    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert("O produto foi adcionado")
    window.location.href = 'carrinho.html';
}


function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const CSSboxRule = document.querySelector('.box');
    const CSSCardRule = document.querySelector('.prod');
    const CSSconteinerRule = document.querySelector('.container');

    const prodimagens = {
        'produto1': 'https://www.pngitem.com/pimgs/m/772-7720817_banho-e-tosa-png-3-png-image.png',
        'produto2': 'https://cdn.awsli.com.br/2500x2500/1226/1226108/produto/55648228/04f1bcd44a.jpg',
        'produto3': 'https://images.tcdn.com.br/img/img_prod/573283/kit_para_banho_caes_filhotes_shampoo_condicionador_e_perfume_baby_cachorro_filhote_sanol_536825_1_8a3adef49c3ea7cc540cb1bcd1ab9e6a.jpg',
        'produto4': 'https://www.galaxcommerce.com.br/sistema/upload/4116/produtos/escova-pet-rasqueadeira-pet-tira-pelos-pra-cachorro-e-gatos-cerdas-macias-com-botao_2023-10-29_17-25-43_0_83.JPG',
        'produto5': 'https://imgs.casasbahia.com.br/1523140742/1xg.jpg',
        'produto6': 'https://cdn.awsli.com.br/600x700/1095/1095221/produto/40384673/2e21a5d78a.jpg',
        'produto7': 'https://www.petlove.com.br/images/products/258569/product/RAOWHI_4.JPG?1658246240',
        'produto8': 'https://www.galaxcommerce.com.br/sistema/upload/4116/produtos/escova-pet-rasqueadeira-pet-tira-pelos-pra-cachorro-e-gatos-cerdas-macias-com-botao_2023-10-29_17-25-43_0_83.JPG',
        'produto9': 'https://imgs.casasbahia.com.br/1523140742/1xg.jpg',
        'produto10': 'https://cdn.awsli.com.br/600x700/1095/1095221/produto/40384673/2e21a5d78a.jpg',
        'produto11': 'https://www.petlove.com.br/images/products/258569/product/RAOWHI_4.JPG?1658246240',
    }

    let demoElement = document.getElementById("add");

    if (carrinho.length === 0) {
        CSSCardRule.remove();
        CSSboxRule.remove();

        CSSconteinerRule.innerHTML = `
        
        <h2> Seu carrinho está vazio </h2>


        `;

        CSSconteinerRule.style.color = 'red';

    }
    carrinho.forEach(produto => {
        let cardProd = `
        <div class="card-item">
            <img id="imagprod-${produto.id}" src="${prodimagens[produto.id]}" alt="Imagem do produto">
            <div class="info">
                <p id="info-${produto.id}">${produto.nome}</p>
                <div class="quantidade">
                    <button onclick="alterarQuantidade('${produto.id}', -1)">-</button>
                    <input type="text" id="quantidade-${produto.id}" value="${produto.quantidade}" readonly>
                    <button onclick="alterarQuantidade('${produto.id}', 1)">+</button>
                </div>
                <p id="preco-${produto.id}"> R$: ${produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
            <button class="remove" onclick="removerProduto('${produto.id}')"><i class="fa-solid fa-trash"></i></button>
        </div>`;
        demoElement.innerHTML += cardProd;
    });
}


function alterarQuantidade(produtoId, delta) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let produto = carrinho.find(item => item.id === produtoId);

    if (produto) {
        produto.quantidade += delta;
        if (produto.quantidade <= 0) {
            removerProduto(produtoId);
        } else {
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            document.getElementById(`quantidade-${produtoId}`).value = produto.quantidade;
        }
    }

    resumoCompras();
}

function resumoCompras() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let frete = 25;
    let subtotal = 0

    carrinho.forEach(novoProduto => { subtotal += novoProduto.preco * novoProduto.quantidade });
    let total = subtotal + frete;

    document.getElementById('Subtotal').innerText = `Subtotal: R$${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById('Frete').innerText = `Frete: R$${frete.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById('Total').innerText = `Total: R$${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    console.log(subtotal);
}

function removerProduto(produtoId) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const produtoIndex = carrinho.findIndex(produto => produto.id === produtoId);

    if (produtoIndex !== -1) {
        carrinho.splice(produtoIndex, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        window.location.reload();
        // carregarCarrinho();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarCarrinho();
    resumoCompras();
});