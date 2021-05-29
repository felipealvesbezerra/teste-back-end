const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { Model } = require("./src/infra/database/Example");
const swagger = require("./src/middleware/swaggerMiddleware")

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use('/api-docs', swagger());


//Routes
app.get('/listar',  async (req, res) =>{
  const documents = await Model.find({})
  res.send(documents)
})

app.post('/cadastro', async (req, res) =>{
  const document = new Model(req.body);
  await document.save();
  res.send({message: 'Document Created', document});
})

app.put('/cadastro/:company',async(req, res) =>{
  const query = {
    company: req.params.company
  };
  const document = await Model.updateOne(query, req.body)
  res.send({message: 'Document Updated', document})
})

app.delete('/deletar/:company', async(req, res) =>{
  const query = {
    company: req.params.company
  };
  const document = await Model.deleteOne(query)
  res.send({message: 'Document deleted', document})
})


app.listen(3000, function(){
  console.log('Server listening on port 3000')
})
