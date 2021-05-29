const request = require('supertest')
const app = require('../src/index')
const mongoose = require('../src/database/config')

afterAll(() => {
    mongoose.connection.close()
})

describe('Happy path', () => {
    test('Deve retornar 201 ao inserir um usuário', async () => {
        const res = await request(app).post('/users/new').send({
            firstName: 'Eduardo',
            lastName: 'Matos',
            nickname: 'Dudu_671',
            email: 'eduardoooax@gmail.com',
            password: '12345678',
            city: 'Pitangueiras',
            state: 'SP',
            country: 'Brasil',
            cpf: '85626864334',
            birthDate: '2003-04-17'
        })

        expect(res.status).toBe(201)
    })

    test('Deve retornar 201 ao inserir um usuário', async () => {
        const res = await request(app).post('/users/new').send({
            firstName: 'Gabriela',
            lastName: 'Figueiredo',
            nickname: 'Gabi',
            email: 'gabi1995@gmail.com',
            password: '12345678',
            city: 'Belo Horizonte',
            state: 'MG',
            country: 'Brasil',
            cpf: '15097339657',
            birthDate: '1995-08-14'
        })

        expect(res.status).toBe(201)
    })

    test('Deve retornar 201 ao inserir um usuário', async () => {
        const res = await request(app).post('/users/new').send({
            firstName: 'Laís',
            lastName: 'Evelyn',
            nickname: 'Laís_Evelyn',
            email: 'laisevelyn@gmail.com',
            password: '12345678',
            city: 'Imperatriz',
            state: 'MA',
            country: 'Brasil',
            cpf: '26969660605',
            birthDate: '1987-05-10'
        })

        expect(res.status).toBe(201)
    })
})

describe('Unhappy path', () => {
    test('Deve retornar 400 se houver algum dado obrigatório faltando', async () => {
        const res = await request(app).post('/users/new').send({
            firstName: 'Eduardo',
            lastName: 'Matos',
            city: 'Pitangueiras',
            state: 'SP',
            country: 'Brasil',
            birthDate: '2003-04-17'
        })

        expect(res.status).toBe(400)
    })

    test('Deve retornar 409 se algum campo de valor único já estiver registrado', async () => {
        const res = await request(app).post('/users/new').send({
            firstName: 'Eduardo',
            lastName: 'Matos',
            nickname: 'Dudu_671',
            email: 'eduardoooax@gmail.com',
            password: '12345678',
            city: 'Pitangueiras',
            state: 'SP',
            country: 'Brasil',
            cpf: '85626864334',
            birthDate: '2003-04-17'
        })

        expect(res.status).toBe(409)
    })
})