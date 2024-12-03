1. Visão Geral
Este sistema é uma aplicação web para gerenciamento de usuários, produtos e carrinho de
compras, com funcionalidades como cadastro, login, dashboard para gerenciar produtos e exibição
de produtos no carrinho. Ele usa HTML, CSS, JavaScript, APIs externas e comunicação com um
backend via fetch.
Estrutura de Arquivos
| Arquivo | Descrição |
|-----------------------|---------------------------------------------------------------------------|
| cadastro.js | Gerencia o cadastro de usuários. |
| cep.js | Realiza busca de endereços via CEP utilizando a API ViaCEP. |
| dashboard.js | Gerencia o cadastro, listagem e exibição de produtos na dashboard. |
| login.js | Gerencia a autenticação de usuários. |
| navbar.js | Controla o comportamento da barra de navegação e animações da página. |
| passar-produto.js | Gerencia o carrinho de compras, incluindo a manipulação de produtos. |
2. Funcionalidades
A seguir, as principais funcionalidades do sistema:
1. **Cadastro de Usuários**:
 - O usuário preenche o formulário com `email`, `senha` e `confirmarSenha`.
 - O sistema verifica se as senhas coincidem.
 - Os dados são enviados ao endpoint `/cadastrar` via uma requisição `POST`.
 - O sistema exibe mensagens de sucesso ou erro com base na resposta.
2. **Login de Usuários**:
 - O usuário insere `email` e `senha`.
 - O sistema envia os dados ao endpoint `/login` via `POST`.
 - Com login bem-sucedido, o usuário é redirecionado à página desejada.
 - Caso contrário, uma mensagem de erro é exibida.
3. **Busca por Endereço (CEP)**:
 - O usuário insere o CEP no campo.
 - O sistema consulta a API ViaCEP.
 - Caso o CEP seja válido, o endereço é exibido. Se inválido, exibe um erro.
4. **Dashboard**:
 - **Cadastro de Produtos**: Usuário preenche nome, preço e link da imagem do produto.
 - **Listagem de Produtos**: Os produtos são carregados do endpoint `/produtos` e exibidos com
nome, preço e imagem.
 - **Edição e Exclusão** de produtos.
5. **Carrinho de Compras**:
 - **Adicionar Produtos**: Produtos são adicionados ao carrinho armazenado no `localStorage`.
 - **Exibir Carrinho**: Produtos do carrinho são exibidos com nome, preço, quantidade e imagem.
 - **Alterar Quantidade/Remover Produtos**.
6. **Navbar**:
 - Menu mobile ativado/desativado ao clicar no botão.
 - Destaque dinâmico no menu com base na rolagem da página.
 - Animações em seções específicas utilizando a biblioteca **ScrollReveal**.
3. Fluxo do Sistema
1. **Cadastro**:
 - O usuário cria uma conta.
2. **Login**:
 - O usuário autentica-se no sistema.
3. **Dashboard**:
 - Administradores gerenciam produtos (cadastram, listam, editam e excluem).
4. **Loja**:
 - Produtos são exibidos para os usuários.
 - O cliente adiciona produtos ao carrinho.
5. **Carrinho**:
 - O cliente revisa os produtos no carrinho, ajusta quantidades e conclui a compra.
4. APIs Utilizadas
### ViaCEP API
- **Descrição**: Busca informações de endereço a partir de um CEP.
- **Endpoint Exemplo**:
 ```
 https://viacep.com.br/ws/01001000/json/
 ```
5. Tecnologias e Bibliotecas
| Tecnologia | Uso |
|------------------|------------------------------------------------|
| JavaScript | Interatividade do sistema |
| HTML/CSS | Estrutura e estilos do frontend |
| Fetch API | Comunicação com o backend e APIs externas |
| ScrollReveal | Animações ao rolar a página |
| jQuery | Manipulação de DOM simplificada |
