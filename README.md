# Documentação da API

## Rodando o projeto

Para rodar o projeto, basta pegá-lo do GitHub e em seguida executar:

```
npm i
```

O comando acima é necessário para instalar todas as bibliotecas em uso pelo projeto. Em seguida, execute:

```
npm start
```

Esse último comando é responsável por iniciar o projeto de fato.

---

## Collection no Postman

Esse é o link da collection das requests no Postman: https://www.postman.com/lunar-module-engineer-56714825/workspace/teddy-back-end/request/16000923-409226a3-caf7-4ef8-814b-939603d78267

Obs: para que elas funcionem, é importante ter o Postman Desktop Agent, pois elas são direcionadas ao localhost.

---

## Testes unitários

Essa API foi construída utilizando TDD com o Jest. Para rodar os testes, é importante que o banco de dados esteja vazio e que os mesmos sejam executados na seguinte ordem:

```sh
    npm test usersInsert.test.js
```

```sh
    npm test usersUpdate.test.js
```

```sh
    npm test usersDelete.test.js
```

```sh
    npm test usersSelect.test.js
```

---

## Iniciando com a API

A API possui um controller de usuários, cujo qual apresenta 5 rotas:

## GET /users/get

Retorna um array contendo todos os usuários do banco de dados.

### Exemplo de requisição:

```
    http://localhost:3000/users/get
```

Exemplo no Insomnia: https://flic.kr/p/2m2sfaX

### Exemplo de resposta:

```js
{
  "users": [
    {
      "_id": "60b1c0ba78f3304a745e2771",
      "firstName": "Eduardo",
      "lastName": "Matos",
      "nickname": "Dudu_671",
      "email": "eduardoooax@gmail.com",
      "password": "$2b$10$FDdoAe0FCgTx0P2b.ncyAukFypVBG1h1Fnul4Q09kz8ZoGM3b999W",
      "city": "Ribeirão Preto",
      "state": "SP",
      "country": "Brasil",
      "cpf": "85626864334",
      "birthDate": "2003-04-17T00:00:00.000Z",
      "createdAt": "2021-05-29T04:19:06.266Z",
      "__v": 0
    },
    {
      "_id": "60b1c0bb78f3304a745e2772",
      "firstName": "Gabriela",
      "lastName": "Figueiredo",
      "nickname": "Gabi",
      "email": "gabi1995@gmail.com",
      "password": "$2b$10$vFbIW9tGkgaVCARgdtN9XeJ.ICUC8a/cTZfGKjU.GsUXaj9l7Het.",
      "city": "Belo Horizonte",
      "state": "MG",
      "country": "Brasil",
      "cpf": "15097339657",
      "birthDate": "1995-08-14T00:00:00.000Z",
      "createdAt": "2021-05-29T04:19:07.838Z",
      "__v": 0
    }
  ]
}
```

### Respostas possíveis:

200 - Array de usuários.  
500 - Erro inesperado.

---

## GET /users/get/:id

Retorna um objeto contendo os dados do usuário selecionado com base no parâmetro id.

### Exemplo de requisição:

```
    http://localhost:3000/users/get/60b1c0ba78f3304a745e2771
```

Exemplo no Insomnia: https://flic.kr/p/2m2i8Ja

### Exemplo de resposta:

```js
{
  "user": {
    "_id": "60b1c0ba78f3304a745e2771",
    "firstName": "Eduardo",
    "lastName": "Matos",
    "nickname": "Dudu_671",
    "email": "eduardoooax@gmail.com",
    "password": "$2b$10$FDdoAe0FCgTx0P2b.ncyAukFypVBG1h1Fnul4Q09kz8ZoGM3b999W",
    "city": "Ribeirão Preto",
    "state": "SP",
    "country": "Brasil",
    "cpf": "85626864334",
    "birthDate": "2003-04-17T00:00:00.000Z",
    "createdAt": "2021-05-29T04:19:06.266Z",
    "__v": 0
  }
}
```

### Respostas possíveis:

200 - Objeto com dados de um usuário.  
400 - O id é um parâmetro obrigatório.  
500 - Erro inesperado.

---

## POST /users/new

Recebe um objeto de dados (JSON) como parâmetro e cria um novo usuário com o mesmo.

### Parâmetros obrigatórios:

```js
{
	firstName: string,
    lastName: string,
    nickname: string,
    email: string,
    password: string,
    city: string,
    state: string,
    country: string,
    cpf: string,
    birthDate: string (formato YYYY-MM-DD)
}
```

### Exemplo de objeto de requisição:

```js
{
	"firstName": "Eduardo",
	"lastName": "Matos",
	"nickname": "Dudu_671",
	"email": "eduardoooax@gmail.com",
	"password": "12345678",
	"city": "Pitangueiras",
	"state": "SP",
	"country": "Brasil",
	"cpf": "85626864334",
	"birthDate": "2003-04-17"
}
```

Exemplo no Insomnia: https://flic.kr/p/2m2mMHj

### Respostas possíveis:

201 - Usuário cadastrado.  
400 - Todos os campos são obrigatórios.  
400 - Email inválido.  
400 - CPF inválido.  
409 - Um usuário com esse nickname já está cadastrado.  
409 - Um usuário com esse email já está cadastrado.  
409 - Um usuário com esse cpf já está cadastrado.  
500 - Erro inesperado.

---

## PUT /users/update

Recebe um objeto (JSON) contendo o id e as propriedades a serem editadas, podendo editar desde um único campo até todos.

### Parâmetros obrigatórios:

```sh
{
	id: string (MongoDB ObjectId - example: "60b1a9b7ffe6f5351869e359")
}
```

### Parâmetros opcionais:

```js
{
	firstName: string,
    lastName: string,
    nickname: string,
    email: string,
    password: string,
    city: string,
    state: string,
    country: string,
    cpf: string,
    birthDate: string (formato YYYY-MM-DD)
}
```

Exemplo no Insomnia: https://flic.kr/p/2m2sfab

### Respostas possíveis:

200 - Dados de usuário alterados.  
400 - O id é um parâmetro obrigatório.  
400 - Email inválido.  
400 - CPF inválido.  
409 - Um usuário com esse nickname já está cadastrado.  
409 - Um usuário com esse email já está cadastrado.  
409 - Um usuário com esse cpf já está cadastrado.  
500 - Erro inesperado.

---

## DELETE /users/delete/:id

Recebe um id como parâmetro e deleta um usuário do banco de dados com base no mesmo.

### Parâmetros obrigatórios:

```sh
 id: string (MongoDB ObjectId - example: "60b1a9b7ffe6f5351869e359")
```

### Exemplo de requisição:

```
    http://localhost:3000/delete/60b1a9b7ffe6f5351869e359
```

Exemplo no Insomnia: https://flic.kr/p/2m2qFWe

### Respostas possíveis

200 - Usuário excluído.  
500 - Erro inesperado.
