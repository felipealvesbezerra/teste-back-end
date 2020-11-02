import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    nome: String,
    sobrenome: String,
    email: String,
    genero: String,
    cpf: { type: String, maxlength: 11 },
    telefone: { type: String, maxlength: 11 },
    endereco: String,
    complemento: String,
    cidade: String,
    estado: { type: String, maxlength: 2 },
  },
  { timestamps: true },
);

export default model('User', UserSchema);
