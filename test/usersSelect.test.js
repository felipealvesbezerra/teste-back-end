const request = require('supertest')
const app = require('../src/index')
const mongoose = require('../src/database/config')
const Users = require('../src/database/models/UsersModel')

afterAll(() => {
    mongoose.connection.close()
})

describe('Happy path', () => {
    test('Deve retornar 200 e todos os usuários se não houver um ID especificado', async () => {
        const res = await request(app).get('/users/get')

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('users')
    })

    test('Deve retornar 200 e um usuário com base no ID especificado', async () => {
        const id = await Users.findOne({ 'cpf': '85626864334' }, { _id: 1 })
        const res = await request(app).get(`/users/get/${id._id}`)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('user')
    })
})