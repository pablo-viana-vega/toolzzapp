# Documentação do Projeto

Este documento fornece instruções sobre como utilizar os módulos de desenvolvimento nas pastas `frontend` e `backend`, e como integrá-los no ambiente de produção.

## Versão do Node.js

Este projeto foi desenvolvido e testado com Node.js versão 20.11.1

## Banco de Dados

O backend deste projeto utiliza SQLite como banco de dados. O banco de dados é criado automaticamente quando o servidor backend é iniciado pela primeira vez. Certifique-se de que o Node.js esteja instalado no seu sistema antes de iniciar o servidor backend.

## Frontend

### Desenvolvimento

1. Certifique-se de ter o Node.js instalado no seu sistema.
2. Abra um terminal na pasta `frontend`.
3. Execute o comando `npm install` para instalar as dependências do projeto.
4. Execute o comando `npm start` para iniciar o servidor de desenvolvimento.

### Produção

1. Após finalizar o desenvolvimento, abra um terminal na pasta raiz do projeto.
2. Execute o comando `node scripts.js` para construir o frontend e iniciar o servidor backend.
3. O frontend será construído e servido a partir da pasta `frontend/build`.
4. O servidor backend será iniciado na porta configurada (por padrão, porta 5000).

## Backend

### Desenvolvimento

1. Certifique-se de ter o Node.js instalado no seu sistema.
2. Abra um terminal na pasta `backend`.
3. Execute o comando `npm install` para instalar as dependências do projeto.
4. Execute o comando `npm start` para iniciar o servidor de desenvolvimento.

### Produção

1. Após finalizar o desenvolvimento, abra um terminal na pasta raiz do projeto.
2. Execute o comando `node scripts.js` para construir o frontend e iniciar o servidor backend.
3. O frontend será construído e servido a partir da pasta `frontend/build`.
4. O servidor backend será iniciado na porta configurada (por padrão, porta 5000).

## Integração Frontend e Backend

Ao integrar o frontend e backend no ambiente de produção, certifique-se de que o frontend está configurado para enviar requisições para o backend na URL correta. Geralmente, isso é configurado no arquivo de configuração do frontend (por exemplo, `.env` ou `config.js`). Certifique-se de ajustar essas configurações para apontar para o servidor backend em produção.

Além disso, ao implantar o projeto em um servidor de produção, configure o servidor da web (por exemplo, Nginx ou Apache) para servir o frontend a partir da pasta `frontend/build` e encaminhar requisições para o backend para o servidor Node.js em execução na porta configurada.

## Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).
