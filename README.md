# Sistema de Gestão de Pizzaria 🍕

## 1. Visão Geral
Este sistema é uma aplicação web moderna desenvolvida para gerenciar usuários, produtos e carrinho de compras. As principais funcionalidades incluem:

- Cadastro de usuários
- Login seguro
- Dashboard para gerenciar produtos
- Exibição e manipulação de produtos no carrinho de compras
- Busca de endereço por CEP utilizando a API ViaCEP

## 2. Estrutura de Arquivos
| Arquivo              | Descrição                                                                 |
|----------------------|---------------------------------------------------------------------------|
| `cadastro.js`         | Gerencia o cadastro de novos usuários com validação de senha.             |
| `cep.js`              | Realiza a busca de endereços com base no CEP via integração com a API ViaCEP. |
| `dashboard.js`        | Gerencia a listagem, cadastro, edição e exclusão de produtos.             |
| `login.js`            | Responsável pela autenticação de usuários com redirecionamento pós-login. |
| `navbar.js`           | Controla o menu de navegação e as animações dinâmicas da interface.       |
| `passar-produto.js`   | Gerencia o carrinho de compras, incluindo manipulação de quantidade, remoção e cálculo de valores. |

## 3. Funcionalidades Principais

### 1. Cadastro de Usuários
- O usuário preenche os campos **email**, **senha** e **confirmar senha**.
- O sistema valida se as senhas coincidem antes de enviar os dados.
- Os dados são enviados para o endpoint `/cadastrar` via POST.
- Retorna mensagens de sucesso ou erro dependendo da resposta do servidor.

### 2. Login de Usuários
- O sistema autentica o usuário utilizando **email** e **senha**.
- Os dados são enviados ao endpoint `/login` via POST.
- Se bem-sucedido, o sistema redireciona o usuário à página inicial. Caso contrário, exibe mensagens de erro claras.

### 3. Busca por Endereço (CEP)
- Utiliza a API **ViaCEP** para buscar informações detalhadas sobre o endereço baseado em um CEP válido.
- Caso o CEP seja inválido, o sistema exibe uma mensagem de erro para o usuário.

### 4. Dashboard
- **Cadastro de Produtos**: O administrador pode registrar produtos com os seguintes campos:
  - Nome do produto
  - Preço
  - Link para imagem do produto
- **Listagem de Produtos**: Produtos são carregados e exibidos com:
  - Nome
  - Preço formatado
  - Imagem em miniatura
- **Edição e Exclusão de Produtos**: O sistema possibilita alterar os dados ou excluir produtos.

### 5. Carrinho de Compras
- **Adicionar Produtos**: Produtos são adicionados ao carrinho e salvos no `localStorage`.
- **Exibição do Carrinho**:
  - Mostra os produtos com detalhes como nome, preço, quantidade e imagem.
  - Permite manipular a quantidade diretamente.
- **Cálculo Dinâmico**:
  - Calcula subtotal, valor do frete fixo e total da compra em tempo real.
- **Remoção de Produtos**: Os itens podem ser removidos com um único clique.

### 6. Navbar e Animações
- **Menu Mobile Responsivo**:
  - Ativado e desativado ao clicar no botão correspondente.
  - Ícones dinâmicos indicam estado do menu.
- **Destaque no Menu**:
  - O sistema identifica a seção ativa e destaca o link correspondente no menu de navegação.
- **ScrollReveal**:
  - Aplica animações suaves ao rolar a página, melhorando a experiência do usuário.

## 4. Fluxo do Sistema
1. **Cadastro**: O usuário cria uma conta.
2. **Login**: O usuário faz login no sistema.
3. **Dashboard**: Administradores gerenciam produtos.
4. **Loja**: Produtos são exibidos e podem ser adicionados ao carrinho.
5. **Carrinho**: O cliente revisa e ajusta os produtos no carrinho antes de finalizar a compra.

## 5. APIs Utilizadas
- **ViaCEP API**
  - Descrição: Busca informações de endereço a partir de um CEP válido.
  - Exemplo de Endpoint:
    ```bash
    https://viacep.com.br/ws/01001000/json/
    ```

## 6. Tecnologias e Bibliotecas Utilizadas
| Tecnologia         | Descrição                                                            |
|--------------------|----------------------------------------------------------------------|
| **JavaScript**      | Para interatividade e funcionalidades dinâmicas.                    |
| **HTML5 e CSS3**    | Estrutura e estilização da interface.                               |
| **Fetch API**       | Comunicação assíncrona com o backend e APIs externas.               |
| **ScrollReveal**    | Animações visuais ao rolar a página.                                |
| **jQuery**          | Facilita manipulações de DOM e eventos.                             |

## 7. Requisitos para Execução

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/pizzaria-sistema.git
    cd pizzaria-sistema
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Configure o ambiente: 
   - Configure o banco de dados e as variáveis no arquivo `.env`.

4. Execute o servidor:

    ```bash
    npm start
    ```

5. Acesse no navegador:

    ```plaintext
    http://localhost:500
    ```

4. Para logar dashboard:

    admin@gmail.com
    admin1

5. Para logar cliente:

   cliente@gmail.com
   cliente (ou cadastrar-se)

## 8. Screenshots do Sistema
Adicione aqui imagens representativas da interface, como:
- Página de login
- Dashboard de produtos
- Carrinho de compras



## 10. Contato
Desenvolvedor: [Kevin Gabriel]  
E-mail: [kgsenaxavier25@gmail.com]
