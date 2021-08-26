# NX-Workspace

## O QUE É
Sistema que utiliza o [NX](https://nx.dev/) como ferramenta pra integrar front-end e backend de maneira rápida.

## A QUEM SE DESTINA / OBJETIVO / COMO FUNCIONA
Projeto criado com intuito de ser utilizado como referência pra estudo em javascript e na absorção como monolito.

## 🚀 Começando
Clonar o projeto de acordo com sua preferência (https ou ssh) e inserir as variáveis de ambiente. Usar arquivo .env-example como referência.

### 📋 Pré-requisitos
- NodeJS.

### 🔧 Instalação
Instalar o projeto usando `npm install` e escolher a porta de acordo com sua preferência dentro do arquivo .env (variáveis de ambiente).
Utilize os abaixo para instalação de core.
- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

### 🔎 Rodando
Para utilizar tanto o first-app e first-app-api, basta utilizar o comando `nx run-many --parallel --target=serve --projects=first-app,first-app-api` dentro da raiz.
Entendendo seu workspace basta utilizar `nx dep-graph`.

## 🛠️ Construído com
- VsCode.
- Mongo DB Compass (client).
- Postman (para testes).

* [ExpressJS](https://expressjs.com/pt-br/).
* [mongoose](https://mongoosejs.com/docs/schematypes.html/).