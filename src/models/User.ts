import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  gender : String,
  github_username: String,
  age: Number,
  email: String,
  password : String,
  cpf : String,
  phone: {
    type: String,
    maxLength: 12
  },
  bio : {
    type : String,
    maxLength: 100
  }
})

const User = mongoose.model('User', userSchema);

export default User;