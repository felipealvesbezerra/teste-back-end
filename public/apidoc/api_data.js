define({ "api": [
  {
    "type": "install",
    "url": "npm",
    "title": "",
    "group": "0_-_NodeJS_e_suas_Dependencias",
    "description": "<p>Neste CRUD, utilizo uma api pública de busca de endereços por CEP, ele se encontra nas páginas html via link.<br> Para utilizar o CRUD, é necessário a instalação do framework NodeJs e seu gerenciador de pacotes npm.<br> Será necessária a instalação de 6 módulos do gerenciador de pacotes, são eles:</p> <ul> <li>express;</li> <li>body-parser;</li> <li>mongo-db;</li> <li>apidoc;</li> <li>grunt-apidoc;</li> <li>ejs;</li> <li>nodemon (opcional).</li> </ul>",
    "examples": [
      {
        "title": "Instalação:",
        "content": "npm install express --save\nnpm install mongodb --save\nnpm install body-parser --save\nnpm install apidoc -g\nnpm install grunt-apidoc --save-dev\nnpm install ejs --save\nnpm install nodemon --save",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "0_-_NodeJS_e_suas_Dependencias",
    "name": "InstallNpm"
  },
  {
    "type": "connect",
    "url": "MongoClient.connect",
    "title": "",
    "examples": [
      {
        "title": "Codigo:",
        "content": "MongoClient.connect(url, (err, client) => {  \n if (err)\n    return console.log(err);\n    db = client.db(\"geosf\"),\n    console.log('conectado ao banco de dados!'),\n    app.listen(3000, function () {\n    console.log(\"Server inciado na porta 3000\")\n    });\n });",
        "type": "json"
      }
    ],
    "group": "1_-_MongoDB",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>O método connect recebe como parametro o link de acesso ao banco de dados.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso:",
          "content": "\nconectado ao banco de dados!\nServer inciado na porta 3000",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "appCrashed",
            "description": "<p>Erro no código da aplicação.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "1_-_MongoDB",
    "name": "ConnectMongoclientConnect"
  },
  {
    "type": "get",
    "url": "/",
    "title": "",
    "examples": [
      {
        "title": "Codigo:",
        "content": "app.get(\"/\", (req, res) => {\nres.render(\"../views/index\")\n});",
        "type": "json"
      }
    ],
    "name": "GetUser",
    "group": "2.0_-_Método_GET",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "get",
            "description": "<p>Faz a requisição da rota especificada.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "render",
            "description": "<p>Renderiza o arquivo especificado.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "appCrashed",
            "description": "<p>Erro no código da aplicação.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "2.0_-_Método_GET"
  },
  {
    "type": "get",
    "url": "/show",
    "title": "",
    "name": "GetUser",
    "group": "2.1_-_Método_GET",
    "examples": [
      {
        "title": "Codigo:",
        "content": "app.get('/show', (req, res) => {\ndb.collection('teste').find().toArray((err, results) => {\nif (err) return console.log(err)\nres.render('show.ejs', { data: results })\n})\n})",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "get",
            "description": "<p>Faz a requisição da /show e renderiza -&gt; 'localhost:<porta>/show'.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "collection",
            "description": "<p>Seleciona o banco de dados escolhido.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "find",
            "description": "<p>Encontra todos os dados especificados. Caso não seja especificado, irá encontrar todos os dados do banco.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "toArray",
            "description": "<p>Retorna em lista.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "appCrashed",
            "description": "<p>Erro no código da aplicação.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "2.1_-_Método_GET"
  },
  {
    "type": "post",
    "url": "/show",
    "title": "",
    "group": "3_-_Método_POST",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "post",
            "description": "<p>Insere os dados preenchidos no formulário HTML.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "collection",
            "description": "<p>Seleciona o banco de dados.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "save",
            "description": "<p>Salva as informações no banco de dados.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "redirect",
            "description": "<p>Redireciona a pessoa a rota especificada após preencher o formulário.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso:",
          "content": "\nDados salvos com sucesso",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "appCrashed",
            "description": "<p>Error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "3_-_Método_POST",
    "name": "PostShow"
  },
  {
    "type": "delete",
    "url": "/show",
    "title": "",
    "name": "crud",
    "group": "4_-_Método_Delete",
    "examples": [
      {
        "title": "Codigo:",
        "content": "\napp.route('/delete/:id')\n.get((req, res) => {\n    var id = req.params.id\n  \n    db.collection(\"teste\").deleteOne(req.body, (err, result) => {\n    if (err) return res.send(500, err)\n    console.log(\"1 arquivo deletado\");\n    res.redirect('/show')\n    })\n  })",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "route",
            "description": "<p>Referencia a rota.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "collection",
            "description": "<p>Seleciona o banco de dados.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deleteOne",
            "description": "<p>Recebe o corpo da requisição e deleta do banco de dados.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "redirect",
            "description": "<p>Redireciona a pessoa a rota especificada após preencher o formulário.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso:",
          "content": "\n1 arquivo deletado",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "appCrashed",
            "description": "<p>Erro no código da aplicação.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "4_-_Método_Delete"
  },
  {
    "type": "put",
    "url": "/edit",
    "title": "",
    "name": "crud",
    "group": "5_-_Método_UPDATE",
    "examples": [
      {
        "title": "Codigo:",
        "content": "\napp.route(\"/edit/:id\")\n  //armazenando em \"var id\" o id que será passado no params vindo da view \n  .get((req, res) => { //métodos serão feitos primeiro no servidor depois na view\n      var id = req.params.id\n      //usando variável para encontrar o objeto que será alterado através da função \".find(Object(id))\"\n      db.collection(\"teste\").find(ObjectId(id)).toArray((err, result) => {\n          if (err)\n              return res.send(err)\n\n          //irá renderizar a view\n          res.render(\"edit.ejs\", { data: result })\n\n          })\n  })\n  .post((req, res) => {\n      var id = req.params.id\n      var name = req.body.name\n      var surname = req.body.surname\n      var sex = req.body.sex\n      var age = req.body.age\n      var phone = req.body.phone\n      var email = req.body.email\n      var linkedin = req.body.linkedin\n      var cep = req.body.cep\n      var rua = req.body.rua\n      var number = req.body.number\n      var bairro = req.body.bairro\n      var cidade = req.body.cidade\n      var uf = req.body.uf\n\n      db.collection(\"teste\").updateOne({ _id: ObjectId(id) }, {\n          $set: {\n              name: name,\n              surname: surname,\n              sex: sex,\n              age: age,\n              phone: phone,\n              email: email,\n              linkedin: linkedin,\n              cep: cep,\n              rua: rua,\n              number: number,\n              bairro: bairro,\n              cidade: cidade,\n              uf: uf\n          }\n      }, (err, result) => {\n          if (err)\n          return res.send(err)\n          res.redirect(\"/show\")\n          console.log(\"Banco de dados atualizado com sucesso!\")\n      })\n  })",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "route",
            "description": "<p>Referencia a rota /edit:id..</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "collection",
            "description": "<p>Seleciona o banco de dados.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "get",
            "description": "<p>Faz a requisição dos parametros e retorna o id (banco de dados) da pessoa selecionada.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "redirect",
            "description": "<p>Redireciona a pessoa a rota especificada após preencher o formulário.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "$set",
            "description": "<p>Cria um conjunto de informações que será atualizado.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "post",
            "description": "<p>Insere os dados no formulário.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso:",
          "content": "\nBanco de dados atualizado com sucesso!",
          "type": "String"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "appCrashed",
            "description": "<p>Erro no código da aplicação.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "5_-_Método_UPDATE"
  }
] });
