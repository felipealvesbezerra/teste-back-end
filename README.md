
#Crud API - RentCar
Api simples para locação de veículos, densevolvida para o teste de candidatos à vaga de desenvolvedor Back-end NodeJS.

**Collection**: <a href="https://www.getpostman.com/collections/2dd5689c1bdc77d91c4a" target="_blank">https://www.getpostman.com/collections/2dd5689c1bdc77d91c4a</a>

**Documentação**: http://localhost:3000/api-docs/

### dependencias:
- express
- pg and pg-hstore
- sequelize
- swagger-jsdoc e swagger-ui-express (documentação)
- ElephantSQL (cloud para teste rapido)

## Installation
```
npm install
or
yarn install
```

## Teste Rapido
Para facilitar o teste, as configurações de banco de dados já estão preenchidas com um servidor para testes hospedado na elephantsql.

```
npm start
```
servidor rodando na url: http://localhost:3000

## Teste Avançado
após instalar as dependencias,
- setar as configurações do banco de dados em
src -> config -> database.js
- rodar as migrations
```
npx sequelize db:migrate
```
- start no servidor
 ```
 npm start
```

### documentação:
```
com o servidor online:
http://localhost:3000/api-docs/
```


## Crud API - RentCar

**Documentação com swagger 01:
![Documentação com swagger 01](imgs/01.JPG)


**Documentação com swagger 02:

![Documentação com swagger 02](imgs/02.JPG)

**Collection postman:
![Collection postman](imgs/03.JPG)