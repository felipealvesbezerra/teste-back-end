# Api-Mongodb
## Tecnologias utilizadas:

- Adonis.js, Framework Back-End voltado para escalabidade, segurança e padronizações de arquitetura.
- Postman, Ferramenta para teste de rotas e comunicação com API via protocolo HTTP.
- Mongodb Cloud Atlas, Banco de dados em Cloud sugerido pelo teste de Back-end para facilitar o funcionamento local. 
- JWT (Javascript Web Token), token utilizado para autenticacação de usuário dentro de sistemas. 
- Swagger.js, Ferramenta profissional ultizada para documentação de API's. 

## Particularidades

- Rotas para POST, PUT, DELETE e GET de usuário. 
- Rotas para POST, PUT, DELETE e GET de Endereço. 
- Conexão feita com banco de dados em Cloud MongoDB
- Sistema de autenticação integrado para demonstração 
- Rota para visualização da documentação ultizando o Swagger.js, porém, documentação feita no postman por sugestão do teste para Back-End.

## Adendos para funcionamento

- A api-mongodb utiliza a ferramenta cloud do banco de dados mongodb atlas, logo, existem permissões a serem dadas previamente antes da ultização, caso contrário no momento de utilização **o IP da maquina que está ultizando pode estará bloqueado**. 

- Mas, claro resolver isso é muito simples! use minhas credenciais e entrando no [site do mongodb](https://account.mongodb.com/account/login) e **usando a minha conta para dar permissão de IP na barra lateral em network access (accesso de rede) tudo funcionará perfeitamente!**

- **Login com google**: 
- Email: vithorvarela.academico@gmail.com
- senha: vithor@varela
## Instalação 

- Certifique-se de instalar previamente o adonis.js em sua maquina com o comando: 
```sh
npm i -g @adonisjs/cli
```

- Dentro do projeto escreva para instalar os pacotes com sistema de gerenciamento de pacotes utilzado no projeto: 
```sh
npm install  
```
ou 
```sh
npm i  
```
- Agora com o adonis.js CLI (comand line interface) instalado é possivel rodar a API na porta 3333 rodando o seguinte comando no terminal dentro do projeto:
```sh
adonis serve --dev 
```
- Após isso você verá em seu terminal a seguinte mensagem: 
```sh
 SERVER STARTED 
> Watching files for changes...

info: serving app on http://127.0.0.1:3333
```

- O arquivo .Env foi disponibilizado para utilização, porém, em **hipotese alguma isso poderia acontecer em um ambiente real de desenvolvimento.**

- **Parabéns nosso projeto agora está funcionando perfeitamente!** 

[Documentação da API](https://www.postman.com/vithorlucas/workspace/api-mongodb/collection/12411046-5f0a83c3-834a-441d-acd7-46a987a3a086?ctx=documentation)
