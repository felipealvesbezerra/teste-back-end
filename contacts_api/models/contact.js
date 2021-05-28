const mongoose = require("mongoose");

const ContactSchemma = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  telefone: { type: Number, required: true },
  age: { type: Number, required: true },
  genero: { type: String, required: true },
  created: { type: Date, default: Date.now() },
  address: {
    rua: { type: String, required: true },
    numero: { type: Number, required: true },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    cep: { type: Number, required: true },
  },
});

const Contact = mongoose.model("Contact", ContactSchemma);

module.exports = Contact;
