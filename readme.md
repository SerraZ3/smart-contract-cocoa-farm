# Aplicação fazenda de cacau

Projeto para aula de contratos inteligente com a rede Ethereum.

## Objetivos

- Criar contrato com solidity
- Compilar e realizar o deploy na rede de testes rinkeby
- Criar interface em react que se comunique com o contrato

## Como rodar

Para testar apenas o frontend basta entrar na pasta `frontend` e rodar:

```sh
$ npm install --save

$ npm start
```

Irá rodar a interface com um contrato padrão

Para rodar o contrato acesse `deploy` e rode:

```sh
$ node deploy.js
```

Para pegar a abi abra o arquivo `compile.js` e descomente da linha 38 a 44 e rode:

```sh
$ node compile.js > contracts/Farm.abi.json
```

A abi será gerada na pasta `deploy/contracts` dentro do arquivo `Farm.abi.json`
