import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

describe('users', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should not be able to create a new user without email', async () => {
    const response = await request(app).post('/users').send({
      first_name: 'User',
      middle_name: 'Example',
      last_name: 'Test',
    });

    expect(response.status).toBe(400);
  });

  it('Should be able to create a new user with just first name and email', async () => {
    const response = await request(app).post('/users').send({
      first_name: 'User Example',
      email: 'user@example.com',
    });

    expect(response.status).toBe(201);
  });

  it('Should be able to change email', async () => {
    let response = await request(app).post('/users').send({
      first_name: 'User Example',
      email: 'user2@example.com',
    });

    const id = response.body.id;

    response = await request(app).put('/users').send({
      id: id,
      email: 'user0@example.com',
    });

    expect(response.status).toBe(200);
  });

  it('Should not be able to change email to an exists one', async () => {
    await request(app).post('/users').send({
      email: 'user3@example.com',
    });

    await request(app).post('/users').send({
      email: 'user@example.com',
    });

    const response = await request(app).put('/users').send({
      email: 'user@example.com',
    });

    expect(response.status).toBe(400);
  });

  it('Should not be able to create a new user with exists email', async () => {
    const response = await request(app).post('/users').send({
      email: 'user@example.com',
      first_name: 'User Example',
    });

    expect(response.status).toBe(400);
  });
});
