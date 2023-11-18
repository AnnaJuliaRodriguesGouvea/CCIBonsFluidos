# CCIBonsFluidos

## Solidary Flow
O sistema **Solidary Flow** é uma aplicação web que foi desenvolvida para auxiliar no projeto **Bons Fluídos** coordenado pela **Profa. Dra. Katia Romero Felizardo** da Univerisade Tecnológica Federal do Paraná (UTFPR) - Campus Cornélio Procópio - gerenciando as aquisições e distribuições de produtos de higiene menstrual para meninas de escolas públicas em Cornélio Procópio.

Em linhas gerais, este sistema ajudará a equipe do projeto a gerenciar eficientemente os produtos de higiene menstrual, desde o momento da aquisição até a distribuição para as meninas das escolas públicas de Cornélio Procópio.

### Funcionalidades
- **Gerenciamento de Usuários**: Para garantir a segurança e o controle de acesso, o sistema permite: 
    - *Cadastro de usuários (Pessoa Física ou Pessoa Jurídica) com dois níveis de permissões:*
        - Administradores: Possuem acesso total às funcionalidades do sistema: controle de produtos, controle de usuários e controle de entradas e saídas de produtos (doações).
        - Membros do projeto: Usuários comuns que possuem algumas limitações, ou seja, conseguem apenas listar os produtos existentes, administrar sua própria conta e registrar doações (entrada e/ou saída de produtos).
    - *Login:* é possível realizar o login com a conta cadastrada no sistema para ter acesso as suas funcionalidades.
    - *Atualização dos dados:* é possível realizar a atualização do email, senha e data de nascimento na tela **Minha Conta -> Perfil**
    - *Exclusão lógica:* é possível realizar a exclusão lógica da conta logada, ou seja, ao clicar em "Excluir" na tela **Minha Conta -> Perfil** é modificado o campo **isExcluido** para **true** na tabela **Acesso**.

- **Controle de produtos de higiene menstrual:**
    - *Cadastro:* posso realizar o cadastro de diversas marcas e tipos de absorventes que serão permitidos serem arrecadados para futura distribuição;
    - *Listagem:* traz todos os produtos cadastrados no sistema e suas devidas informações, exceto os excluídos, utilizando paginação;
    - *Atualização:* permite atualizar qualquer informação de um produto;
    - *Exclusão Lógica:* ao excluir um produto ele não é deletado do banco de dados, apenas é modificado o campo **isExcluido** para **true** na tabela **Produto** pois é necessário manter a informação de quantidade de pacotes no estoque - campo **quantidadeDePacote**.

- **Controle de estoque:** 
    - O sistema permite o controle em tempo real do estoque de produtos, atualizando automaticamente a quantidade disponível (modificando o campo **quantidadeDePacote** na tabela **Produto** no banco de dados) sempre que houver entradas ou saídas de produtos. 
    - Os usuários podem visualizar o estoque de cada produto na tela de listagem de produtos ou em "PRODUTO DESCRIÇÃO" na tela de doações.

- **Controle de doações:**
    - *Cadastro:* É possível registrar o tipo de transação da doação, ou seja, a entrada – isso inclui produtos doados por terceiros ou adquiridos pelo projeto – e a saída de produtos do estoque.
    - Não é possível alterar um registro de doação ou excluir qualquer registro, pois essa lógica de negócio diminui as chances de "fraude" dentro do projeto. 
        - Por exemplo: se um membro registrar que recebeu 50 pacotes de um produto no momento que está sendo monitorado e depois quiser fraudar o projeto, ele poderia editar mudando para 20 pacotes e roubar os outros 30.
        - Outro exemplo: suponha que no projeto cada instituição só pode receber 500 pacotes no mês. Alguém no projeto pode editar uma doação alterando a instituição destino para que no histórico de doações uma determinada instituição não tenha recebido os 500 pacotes sendo que já recebeu.
    - *Listagem:* traz todas as transações (doações) utilizando paginação.

### Tecnologias utilizadas
O sistema utiliza as seguintes tecnologias:
- Javascript
- Node JS
- Express
- React JS + Vite

### Compilar e executar o sistema
- **Instalações necessárias:**
    - *PostgreSQL:* versão 14.10
        - Para realizar o download acesse o link **https://www.enterprisedb.com/downloads/postgres-postgresql-downloads** e selecione a versão 14.10 de acordo com o seu sistema operacional.
        - Após finalizar o download realize a instalação do programa. Abaixo segue tutoriais do youtube:
            - Windows: https://www.youtube.com/watch?v=FaN1nQibHyY&t=271s
            - MacOS: https://www.youtube.com/watch?v=Z-iM7hUdBSg
            - Linux: https://www.youtube.com/watch?v=1jSb4LJH1dw
        - OBS.: Lembre-se de instalar o **pgAdmin**!
    - *Node.JS:* versão 18.15.0
        - Para realizar o download acesse o link **https://nodejs.org/en/download** e selecione o seu sistema operacional.
        - Após finalizar o download realize a instalação do programa. Abaixo segue tutoriais do youtube:
            - Windows: https://www.youtube.com/watch?v=-jft_9PlffQ
            - MacOS: https://www.youtube.com/watch?v=pHz7TgEIa0w
            - Linux: https://www.youtube.com/watch?v=LU1TYsyPim0

- **Instalações iniciais das bibliotecas:**
    - O projeto utiliza diversas bibliotecas instaladas usando **npm** (estas podem ser verificadas nos arquivos **package.json** e **frontend/package.json**). Dessa forma, é necessário realizar a instalação de todas elas. Para isso, siga os passos abaixo:
        - Clone o repositório:
        ```sh
            git clone https://github.com/AnnaJuliaRodriguesGouvea/CCIBonsFluidos.git
        ```
        - Abra a pasta raiz do projeto em um terminal e digite o seguinte comando para instalar as bibliotecas do backend (package.json):
        ```sh
            npm install
        ```
        - Agora acesse a pasta **/frontend**:
         ```sh
            cd frontend/
        ```
        - Com a pasta **frontend** aberta no terminal digite novamente o comando abaixo:
        ```sh
            npm install
        ```

- **Configurando o banco de dados local:**
    - Para conseguir rodar o projeto localmente é necessário configurar o PostgreSQL. Dessa forma, siga os passos a seguir:
        - Abra o pgAdmin e crie um novo **Database**
        - Crie um arquivo **.env** copiando as constantes de configurações de banco de dados necessárias do arquivo **.env.sample** e preencha com as informações do seu banco de dados:
        ```txt
            DB_DIALECT= Seu DB Dialect - ex: postgress
            DB_HOST= Seu host - ex: localhost
            DB_NAME= Nome do banco de dados criado no passo anterior
            DB_USER= Nome do user do seu banco de dados
            DB_PASSWORD= Senha do seu banco de dados
        ```
- **Configurando o JWT:**
    - O projeto utiliza JWT para autenticação de usuários, dessa forma é necessário configurar uma **secret**. Siga os passos abaixo:
        - Dentro do seu arquivo **.env** acrescente a constante de configuração igual mostrada no **.env.sample**:
        ```txt
            JWT_SECRET= Coloque uma secret qualquer - ex: Abcasdfqwr
        ```

- **Rodar projeto:**
    - O projeto possui o backend e frontend no mesmo repositório. Portanto, é necessário rodar as duas partes do projeto:
        - Abra a pasta raiz do projeto no terminal e digite o seguinte comando para rodar o backend:
        ```sh
            npm start
        ```
        - Em outro terminal abra a pasta **frontend** do projeto e digite o seguinte comando para rodar o frontend:
        ```sh
            npm run dev
        ```
    - OBS.: Cada vez que for reiniciado o backend o banco de dados será reinstalado, ou seja, será realizado **await sequelize.sync({force: true})** apagando todos os dados e tabelas e será reinstalado as tabelas e dados iniciais novamente.
    - OBS.2: Ao rodar o backend é inicializado as seguintes tabelas: 
        - *Fluxos*, *Suavidades*, *Tamanhos*, *TipoAbsorventes* e *Transacao*: são tabelas chave valor que serão utilizadas ao longo do sistema evitando erros de escrita do usuário e mantendo uma padronização.
        - *Acessos*: é inicializada com um super admin (não é nem Pessoa Física e nem Pessoa Jurídica).

- **Conta super admin:**
    - Como dito nas observações no passo anterior, ao rodar o backend é criado um usuário super admin. Para utilizá-lo basta usar as credenciais de login abaixo:
        - Email: superadmin@admin.com
        - Senha: admin123

### Usando o sistema
- Para utilizar o sistema pela primeira vez você pode logar utilizando a conta super admin para ter acesso as funcionalidades de um administrador e/ou criar outros admins. Mas também poderá se cadastrar como um usuário comum com suas limitações definidas nesse documento.
- Para cadastrar uma transação (doação - entrada e/ou saída) é necessário ter algum produto cadastrado no sistema e alguma conta de Pessoa Jurídica (que será utilizado como destino de doações e/ou responsável pela entrada de doações).


## Desenvolvedores
- Alisson Seiti Suganuma
- Anna Júlia Rodrigues Gouvea
- Douglas de Oliveira Ribeiro
- Lémersom Fernandes Filho
- Luis Felipe Mori
