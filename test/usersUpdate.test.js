const request = require('supertest')
const app = require('../src/index')
const mongoose = require('../src/database/config')
const Users = require('../src/database/models/UsersModel')

afterAll(() => {
    mongoose.connection.close()
})

describe('Happy path', () => {
    test('Deve retornar 200 ao alterar os dados de um usuário', async () => {
        const id = await Users.findOne({ 'cpf': '85626864334' }, { _id: 1 })
        const res = await request(app).put('/users/update').send({
            id: id._id,
            city: 'Ribeirão Preto'
        })

        expect(res.status).toBe(200)
    })
})

describe('Unhappy path', () => {
    test('Deve retornar 400 se o ID não for informado na requisição', async () => {
        const res = await request(app).put('/users/update').send({
            city: 'Ribeirão Preto'
        })

        expect(res.status).toBe(400)
    })

    test('Deve retornar 409 se algum campo de valor único já estiver registrado', async () => {
        const id = await Users.findOne({ 'cpf': '15097339657' }, { _id: 1 })
        const res = await request(app).put('/users/update').send({
            id: id._id,
            cpf: '85626864334'
        })

        expect(res.status).toBe(409)
    })
})