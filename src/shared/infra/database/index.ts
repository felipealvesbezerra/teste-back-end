import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (name = 'default'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const configDev = {
    name,
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: 'docker',
    database: 'appgjc',
  };

  const configTest = {
    name,
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: 'docker',
    database: 'test_appgjc',
  };

  const configProduction = {
    name,
    type: 'mysql',
    host: '108.167.132.218',
    port: 3306,
    username: 'guia6593_backend',
    password: '!]5d8TY18T5,_q)!6P',
    database: 'guia6593_app',
  };

  if (process.env.NODE_ENV === 'test') {
    Object.assign(defaultOptions, configTest);
  }

  if (process.env.NODE_ENV === 'dev') {
    Object.assign(defaultOptions, configDev);
  }

  if (process.env.NODE_ENV === 'production') {
    Object.assign(defaultOptions, configProduction);
  }

  return createConnection(defaultOptions);
};
