<p align='center'>
  <a href="https://insomnia.rest/run/?label=Stay%20Safe%20Ajuda%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2Festacao-hack-2020%2Fstay-safe_ajuda-api%2Fmain%2FInsomniav4.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>  
</p>

# Stay Safe REST API

### [![heroku deploy](https://img.shields.io/github/deployments/estacao-hack-2020/stay-safe_ajuda-api/staysafe-api?color=purple&label=heroku%20api%20deploy)](https://staysafe-api.herokuapp.com/)
<br/>

### Clonar repositório e instruções de uso

```sh
  # Clone o repositório e entre na pasta
  $ git clone https://github.com/estacao-hack-2020/stay-safe_ajuda-api.git
  $ cd stay-safe_ajuda-api

  # Instale as dependencias
  $ yarn install
  
  # inicialize o banco de dados de teste
  $ yarn devdb

  # rode o programa
  $ yarn dev
```
> ℹ️ : Ele estará disponível no link http://localhost:3333/

<br/>

## Rotas
<br/>

> **GET:** /help
- lista a lista de ajudas

Exemplo de Resposta no Response body:
```Json
[
  {
    "id": 1,
    "nome": "Lucas",
    "telefone": "11984758690",
    "email": "lucas@mail.com",
    "idade": 26,
    "latitude": 12.9048553,
    "longitude": -43.9328439,
    "mensagem": "mensagem de teste",
    "dataCriacao": "2020-12-09T22:57:41.909Z",
    "status": "finalizado"
  },
  {
    "id": 2,
    "nome": "Lucas 2",
    "telefone": "11984758690",
    "email": "lucas@mail.com",
    "idade": 26,
    "latitude": 12.9048553,
    "longitude": -43.9328439,
    "mensagem": "teste",
    "dataCriacao": "2020-12-09T23:31:36.477Z",
    "status": "aguardando"
  }
]
```

> **GET:** /help/1
- lista uma ajuda pelo id

Exemplo de Resposta no Response body:
```Json
{
  "id": 1,
  "nome": "Lucas",
  "telefone": "11984758690",
  "email": "lucas@mail.com",
  "idade": 26,
  "latitude": 12.9048553,
  "longitude": -43.9328439,
  "mensagem": "mensagem de teste",
  "dataCriacao": "2020-12-09T22:57:41.909Z",
  "status": "finalizado"
}
```

> **POST:** /help
- cria um novo pedido de ajuda

Exemplo de Request Body aceito:
```Json
{
  "nome": "Lucas",
  "idade": 26,
  "mensagem": "mensagem de teste",
  "telefone": "11984758690",
  "email": "lucas@mail.com",
  "latitude": 12.9048553,
  "longitude": -43.9328439
}
```

> **PUT:** /help/1
- atualiza um pedido de ajuda pelo id

Exemplo de Request Body aceito:
```Json
{
  "nome": "Lucas Souza",
  "idade": 26,
  "mensagem": "mensagem de teste maior",
  "telefone": "11984758690",
  "email": "lucas@mail.com",
  "latitude": 12.9048553,
  "longitude": -43.9328439,
  "status": "finalizado"
}
```

> **PATCH** /help/1
- atualiza o status de um pedido de ajuda

Exemplo de Request Body aceito:
```Json
{
  "status": "finalizado
}
```

> **DELETE:** /help/1
- remove um pedido de ajuda pelo id