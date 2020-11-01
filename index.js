const express = require('express')
const bodyParser = require('body-parser')


const users = require('./config/routes/user.routes')

const app = express()

require('./config/db')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/user', users)
app.use('/', users)



let port = 3002

app.listen(port, () =>{
  console.log('Backend em execução...')
})