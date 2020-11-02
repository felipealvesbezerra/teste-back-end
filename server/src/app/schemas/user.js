import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
    },
    date_birth: {
      type: Date,
      required: true,
    },
    language: {
      type: String,
      required: false,
    },
    country: {
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
