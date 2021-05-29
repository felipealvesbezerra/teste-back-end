# Teste à vaga de desenvolvedor Back-end NodeJS na Teddy Open Banking

<p align="center">
  <a href="#bookmark-about">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-technologies">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#construction_worker-how-to-run">Como rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">License</a>
</p>

## :bookmark: Sobre

Criar um CRUD, qualquer entidade, com 10 campos

# :computer: Tecnologias

- [Typescript](https://www.typescriptlang.org/) - Typescript é um superconjunto
  de Javascript que adiciona tipagem e alguns outros recursos a linguagem.
- [Express](https://expressjs.com/) - mini framework para servidores web.
- [SQLite](https://www.sqlite.org/) - é um banco leve e prático, que não precisa
  instalar.
- [TypeORM](https://typeorm.io/#/) - ORM para conexão com o banco.
- [Jest](https://jestjs.io/) - framework de teste.
- [Supertest](https://www.npmjs.com/package/supertest) - framework para
  high-level abstração de testes.
- [yup](https://www.npmjs.com/package/yup) - validação dos inputs.
- [uuid](https://www.npmjs.com/package/uuid) - utilizado a v4 para geração dos
  ids.

Também foi bastante utilizado a extensão
[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client),
a qual possibilita a execução de chamadas rest diretamente do vscode, o que
agiliza muito o desenvolvimento e os testes.

# :boom: Como rodar

- ### **Requisitos**

  - É **necessário** ter **[Node.js](https://nodejs.org/en/)** instalado no
    computador.
  - Além disso, é **necessário** ter um gerenciador de pacotes
    **[NPM](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**.
  - É **opcional** ter **[Git](https://git-scm.com/)** instalado e configurado
    no computador, mas é melhor ter.

```bash
# Clone o repositório
$ git clone https://github.com/wfTom/teste-back-end.git
```

### 💻 Execute o Projeto

```bash
# Vá na pasta teste-back-end
$ cd teste-back-end

# Instale as dependências
$ yarn install

# Rode a aplicação
$ yarn start
```

Acesse API em http://localhost:3333/

### 💻 Execute o Banco

```bash
# Vá na pasta teste-back-end
$ cd teste-back-end

# Rode as migrations - criação das tabelas
$ yarn typeorm migration:run
```

### 💻 Execute os Testes

```bash
# Vá na pasta teste-back-end
$ cd teste-back-end

# Rode os testes
$ yarn jest
```

# :closed_book: Licença

Lançado em 2021: closed_book: Licença

Feito com ❤︎ por [wfTom](https://github.com/wfTom) 🚀. Este projeto está em a
[MIT license](./LICENSE).

Dê um ⭐️ se este projeto te ajudou!

<p align="left">
   <a href="https://www.linkedin.com/in/wellington-barros-593ba0137/">
      <img alt="Wellington Barros" src="https://img.shields.io/badge/-Wellington%20Barros-8257E5?style=flat&logo=Linkedin&logoColor=white" />
   </a>
<p>
