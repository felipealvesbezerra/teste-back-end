# Teste para candidatos à vaga de desenvolvedor Back-end NodeJS

API REST CRUD desenvolvida em ambiente __NodeJS__ com linguagem __TypeScript__, utilizando como base de dados o banco em nuvem NoSQL __MongoDB__.

A aplicação é capaz de criar um usuário, listar todos os usuários, atualizar um usuário e também deletar um usuário.

O formato dos campos, em JSON, devem conter:

```
{
	"nome": "",
	"sobrenome": "",
	"email": "",
	"genero": "",
	"cpf": "", (máximo 11 dígitos)
	"telefone": "", (máx 11 dígitos)
	"endereco": "",
	"complemento": "",
	"cidade": "",
	"estado": "" (2 dígitos, ex: SP)
}
```

Para testar a aplicação, clone este repositório e utilize no terminal o comando ```yarn``` para instalar todas as dependências necessárias.

Para gerar a documentação da API, foi utilizado o software Postman, acionandas todas as requisições e a partir da coleção users -> botão View in Web para gerar a documentação da API.

Para acessar o __link da documentação__ da API, clique [aqui](https://web.postman.co/collections/13320329-e0fb0acb-6e42-4212-9cb7-8fc5fe362095?version=latest&workspace=317a4415-fc3b-414c-8174-515b728beb31).

Para acessar o __link da collection__ usada no postman, clique [aqui](https://www.getpostman.com/collections/5a5c19cb6492a38b44a2)


