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
    window.location.href = '/carrinho';
}


function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const CSSboxRule = document.querySelector('.box');
    const CSSCardRule = document.querySelector('.prod');
    const CSSconteinerRule = document.querySelector('.container');

    const prodimagens = {
        'produto1': 'https://i.ytimg.com/vi/tiW-9oASTx0/maxresdefault.jpg',
        'produto2': 'https://caprichosdolar-files.s3-accelerate.amazonaws.com/2023/04/Pizza-Napolitana-1-500x500.jpg',
        'produto3': 'https://www.sabornamesa.com.br/media/k2/items/cache/513d7a0ab11e38f7bd117d760146fed3_XL.jpg',
        'produto4': 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFwpJHe9nWRx2MW5kaFs4oZDKX-TUUE_vsBmLndopr4PWlV0JEdRhCW2KOm-ZTU9rc1Wb8Hi_w-Dzb2OSq8t3ezJwNn74xjgwRQe6jT8TC4a8yHrcyno1oRtapahD8RMOSW_w7n0U-n-Ae-_vQT5KPNtplnOj2MDQfzNTfUigDS54hitZMsFUR2L-uBAE/s1600/receita-de-pizza-a-paulista.webp',
        'produto5': 'https://s2-receitas.glbimg.com/wb7DIMyCpEyV07sTAtcDWD8HQjw=/0x0:1200x675/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2024/h/r/EfCbvqTbeDRAD3Lzc5xA/pizza-margherita.jpg',
        'produto6': 'https://www.receitasnestle.com.br/sites/default/files/srh_recipes/d036cd01122da62bf581784f52d99b3a.jpg',
        
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
    let frete = 10;
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