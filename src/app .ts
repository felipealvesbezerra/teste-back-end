import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes/index';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.database();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database(): void {
    mongoose.connect(
      'mongodb+srv://buongermino:dEf1dkLymt5zp6mn@cluster0.5i14b.mongodb.net/teste-backend?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
