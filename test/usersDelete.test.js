const request = require('supertest')
const app = require('../src/index')
const mongoose = require('../src/database/config')
const Users = require('../src/database/models/UsersModel')

afterAll(() => {
    mongoose.connection.close()
})

describe('Happy path', () => {
    test('Deve retornar 200 ao excluir um usuário', async () => {
        const id = await Users.findOne({ 'cpf': '26969660605' }, { _id: 1 })
        const res = await request(app).delete(`/users/delete/${id._id}`)

        expect(res.status).toBe(200)
    })
})

describe('Unhappy path', () => {
    test('Deve retornar 404 se o ID não for informado na requisição', async () => {
        const res = await request(app).delete('/users/delete')

        expect(res.status).toBe(404)
    })
})