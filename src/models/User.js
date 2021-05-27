import mongoose from 'mongoose';

const user = new mongoose.Schema({

  firstname: {
    type: String,
    maxlength: 50,
    required: true,
  },
  lastname: {
    type: String,
    maxlength: 50,
    required: true,
  },
  nickname: {
    type: String,
    maxlength: 30,
    required: true,
  },
  gender: {
    type: String,
    maxlength: 10,
    required: true,
  },
  email: {
    type: String,
    maxlength: 100,
    required: true,
  },
  age: {
    type: Number,
    maxlength: 3,
    required: true,
  },
  cpf: {
    type: String,
    maxlength: 15,
    required: true,
  },
  address: {
    type: String,
    maxlength: 100,
    required: true,
  },
  bio: {
    type: String,
    maxlength: 100,
    required: false,
  },

}, { timestamps: {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  },

});

const User = mongoose.model("user", user);

export default User;