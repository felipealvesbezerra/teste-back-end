const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectID

app.use(express.static("public"));
//conectando ao banco de dados


const url = "mongodb+srv://geosf:geosf@cluster0.1wkik.mongodb.net/crud?retryWrites=true&w=majority";

MongoClient.connect(url, (err, client) => {
    
    if (err)
        return console.log(err);
    db = client.db("geosf"),
        console.log('conectado ao banco de dados!'),
        app.listen(3000, function () {
            console.log("Server inciado na porta 3000")
        });
});



/** 
 * @api {install} npm
 * @apiGroup 0 - NodeJS e suas Dependencias
 *
 * @apiDescription
 * Neste CRUD, utilizo uma api pública de busca de endereços por CEP, ele se encontra nas páginas html via link.<br>
 * Para utilizar o CRUD, é necessário a instalação do framework NodeJs e seu gerenciador de pacotes npm.<br>
 * Será necessária a instalação de 6 módulos do gerenciador de pacotes, são eles:
 * - express;
 * - body-parser;
 * - mongo-db;
 * - apidoc;
 * - grunt-apidoc;
 * - ejs;
 * - nodemon (opcional).
 * 
 * @apiExample Instalação:
 * npm install express --save
 * npm install mongodb --save
 * npm install body-parser --save
 * npm install apidoc -g
 * npm install grunt-apidoc --save-dev
 * npm install ejs --save
 * npm install nodemon --save
 * 
 */

/**
 * @api {connect} MongoClient.connect
 * @apiExample Codigo:
 *  MongoClient.connect(url, (err, client) => {  
 *   if (err)
 *      return console.log(err);
 *      db = client.db("geosf"),
 *      console.log('conectado ao banco de dados!'),
 *      app.listen(3000, function () {
 *      console.log("Server inciado na porta 3000")
 *      });
 *   });
 *
 * 
 * @apiGroup 1 - MongoDB
 *
 * @apiParam {String} url O método connect recebe como parametro o link de acesso ao banco de dados.
 *
 * 
 * @apiSuccessExample {String} Sucesso:
 * 
 * conectado ao banco de dados!
 * Server inciado na porta 3000
 *
 * @apiError appCrashed Erro no código da aplicação.
 *
 * 
 */

//incluindo BodyParser no projeto para lidar com dados enviados pelo <form>
app.use(bodyParser.urlencoded({ extended: true }));


//apontando direção 
app.use(express.static(path.join(__dirname, "views")));


//apontando para renderizar o arquivo no navegador
app.get("/", (req, res) => {
    res.render("../views/index")
});

/**
 * @api {get} /
 * @apiExample Codigo:
 *       app.get("/", (req, res) => {
 *       res.render("../views/index")
 *       });
 *
 * @apiName GetUser
 * @apiGroup 2.0 - Método GET
 *
 * @apiParam {String} get Faz a requisição da rota especificada.
 * @apiParam {String} render Renderiza o arquivo especificado.
 *
 * 
 *
 * @apiError appCrashed Erro no código da aplicação.
 *
 * 
 */

//renderizando a rota "show" quando o usuário enviar os dados
app.get('/show', (req, res) => {
    db.collection('teste').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

/**
 * @api {get} /show 
 * @apiName GetUser
 * @apiGroup 2.1 - Método GET
 * 
 * @apiExample Codigo:
 * app.get('/show', (req, res) => {
 * db.collection('teste').find().toArray((err, results) => {
 * if (err) return console.log(err)
 * res.render('show.ejs', { data: results })
 * })
 * })
 *
 * @apiParam {String} get Faz a requisição da /show e renderiza -> 'localhost:<porta>/show'.
 * @apiParam {String} collection Seleciona o banco de dados escolhido.
 * @apiParam {String} find Encontra todos os dados especificados. Caso não seja especificado, irá encontrar todos os dados do banco.
 * @apiParam {String} toArray Retorna em lista.
 * 
 *
 *
 * @apiError appCrashed Erro no código da aplicação.
 *
 * 
 */

//rota post
app.post("/show", (req, res) => {

    //criando coleção para armazenamento de dados
    db.collection("teste").save(req.body, (err, result) => {
        if (err)
            return console.log(err);

        console.log("Dados salvos com sucesso")

        //redirecionando usuário para a raíz após realizar cadastro
        res.redirect("/show")
    })
})

/**
 * @api {post} /show
 * @apiGroup 3 - Método POST
 * @apiExampleSuccess Codigo:
 * app.post("/show", (req, res) => {
 * db.collection("teste").save(req.body, (err, result) => {
 *     if (err)
 *         return console.log(err);
 *
 *     console.log("Dados salvos com sucesso")
 *     res.redirect("/show")
 *  })
 * })
 * 
 * @apiParam {String} post Insere os dados preenchidos no formulário HTML.
 * @apiParam {String} collection Seleciona o banco de dados.
 * @apiParam {String} save Salva as informações no banco de dados.
 * @apiParam {String} redirect Redireciona a pessoa a rota especificada após preencher o formulário.
 * 
 * @apiSuccessExample {String} Sucesso:
 * 
 * Dados salvos com sucesso
 *
 *
 * @apiError appCrashed Error
 *
 * 
 */

//DELETE
app.route('/delete/:id')
.get((req, res) => {
    var id = req.params.id
    
    db.collection("teste").deleteOne(req.body, (err, result) => {
        if (err) return res.send(500, err)
        console.log("1 arquivo deletado");
        res.redirect('/show')
      })
    })

/**
 * @api {delete} /show
 * @apiName crud
 * @apiGroup 4 - Método Delete
 *
 * @apiExample Codigo:
 * 
 * app.route('/delete/:id')
 * .get((req, res) => {
 *     var id = req.params.id
 *   
 *     db.collection("teste").deleteOne(req.body, (err, result) => {
 *     if (err) return res.send(500, err)
 *     console.log("1 arquivo deletado");
 *     res.redirect('/show')
 *     })
 *   })
 * 
 * 
 * @apiParam {String} route Referencia a rota.
 * @apiParam {String} collection Seleciona o banco de dados.
 * @apiParam {String} deleteOne Recebe o corpo da requisição e deleta do banco de dados.
 * @apiParam {String} redirect Redireciona a pessoa a rota especificada após preencher o formulário.
 *
 * @apiSuccessExample {String} Sucesso:
 * 
 * 1 arquivo deletado
 * 
 * @apiError appCrashed Erro no código da aplicação.
 *
 * 
 */


//UPDATE
app.route("/edit/:id")
    //armazenando em "var id" o id que será passado no params vindo da view 
    .get((req, res) => { //métodos serão feitos primeiro no servidor depois na view
        var id = req.params.id
        //usando variável para encontrar o objeto que será alterado através da função ".find(Object(id))"
        db.collection("teste").find(ObjectId(id)).toArray((err, result) => {
            if (err)
                return res.send(err)

            //irá renderizar a view
            res.render("edit.ejs", { data: result })

            })
    })
    .post((req, res) => {
        var id = req.params.id
        var name = req.body.name
        var surname = req.body.surname
        var sex = req.body.sex
        var age = req.body.age
        var phone = req.body.phone
        var email = req.body.email
        var linkedin = req.body.linkedin
        var cep = req.body.cep
        var rua = req.body.rua
        var number = req.body.number
        var bairro = req.body.bairro
        var cidade = req.body.cidade
        var uf = req.body.uf

        db.collection("teste").updateOne({ _id: ObjectId(id) }, {
            $set: {
                name: name,
                surname: surname,
                sex: sex,
                age: age,
                phone: phone,
                email: email,
                linkedin: linkedin,
                cep: cep,
                rua: rua,
                number: number,
                bairro: bairro,
                cidade: cidade,
                uf: uf
            }
        }, (err, result) => {
            if (err)
            return res.send(err)
            res.redirect("/show")
            console.log("Banco de dados atualizado com sucesso!")
        })
    })

/**
 * @api {put} /edit
 * @apiName crud
 * @apiGroup 5 - Método UPDATE
 *
 * @apiExample Codigo:
 * 
 * app.route("/edit/:id")
 *   //armazenando em "var id" o id que será passado no params vindo da view 
 *   .get((req, res) => { //métodos serão feitos primeiro no servidor depois na view
 *       var id = req.params.id
 *       //usando variável para encontrar o objeto que será alterado através da função ".find(Object(id))"
 *       db.collection("teste").find(ObjectId(id)).toArray((err, result) => {
 *           if (err)
 *               return res.send(err)
 *
 *           //irá renderizar a view
 *           res.render("edit.ejs", { data: result })
 *
 *           })
 *   })
 *   .post((req, res) => {
 *       var id = req.params.id
 *       var name = req.body.name
 *       var surname = req.body.surname
 *       var sex = req.body.sex
 *       var age = req.body.age
 *       var phone = req.body.phone
 *       var email = req.body.email
 *       var linkedin = req.body.linkedin
 *       var cep = req.body.cep
 *       var rua = req.body.rua
 *       var number = req.body.number
 *       var bairro = req.body.bairro
 *       var cidade = req.body.cidade
 *       var uf = req.body.uf
 *
 *       db.collection("teste").updateOne({ _id: ObjectId(id) }, {
 *           $set: {
 *               name: name,
 *               surname: surname,
 *               sex: sex,
 *               age: age,
 *               phone: phone,
 *               email: email,
 *               linkedin: linkedin,
 *               cep: cep,
 *               rua: rua,
 *               number: number,
 *               bairro: bairro,
 *               cidade: cidade,
 *               uf: uf
 *           }
 *       }, (err, result) => {
 *           if (err)
 *           return res.send(err)
 *           res.redirect("/show")
 *           console.log("Banco de dados atualizado com sucesso!")
 *       })
 *   })
 * 
 * 
 * @apiParam {String} route Referencia a rota /edit:id..
 * @apiParam {String} collection Seleciona o banco de dados.
 * @apiParam {String} get Faz a requisição dos parametros e retorna o id (banco de dados) da pessoa selecionada.
 * @apiParam {String} redirect Redireciona a pessoa a rota especificada após preencher o formulário.
 * @apiParam {String} $set Cria um conjunto de informações que será atualizado.
 * @apiParam {String} post Insere os dados no formulário.
 * 
 * @apiSuccessExample {String} Sucesso:
 * 
 * Banco de dados atualizado com sucesso!
 * 
 * @apiError appCrashed Erro no código da aplicação.
 *
 * 
 */