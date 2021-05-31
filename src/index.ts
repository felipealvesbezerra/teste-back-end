import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import route from './routes';

mongoose.connect( `mongodb+srv://Thais:$teddy@cluster0.lbgku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(cors);
app.use(express.json());
app.use(route)

app.listen(3333);