import 'reflect-metadata';
import 'dotenv/config';
import { errors } from 'celebrate';

import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors';
import cors from 'cors';
import createConnection from '@shared/infra/database';
import AppError from '@shared/errors/AppError';

import '@shared/container';

import routes from './routes';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err.message);
  console.log(`This error is origined from: ${err.stack}`);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
