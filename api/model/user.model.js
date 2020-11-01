const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: String, required: true, max: 11 },
  rg: { type: String, required: true, max: 14 },
  celular: { type: String, required: true, max: 11},
  sexo: { type: String, required: true, max: 1},
  dataNascimento: { type: Date, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true, max: 2}
})

module.exports = mongoose.model('User', UserSchema)