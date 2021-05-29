const bcrypt = require('bcrypt')

const { isCpfValid, isEmailValid, isDateValid, isDataMissing } = require('../utils/validationFunctions')
const Users = require('../database/models/UsersModel')

const getAllUsersFromDatabase = async () => {
    try {
        const getAllUsers = await Users.find()
        return getAllUsers
    } catch (error) {
        return { error }
    }
}

const getUserByIdFromDatabase = async (id) => {
    try {
        const getUserById = await Users.findById(id)
        return getUserById
    } catch (error) {
        return { error }
    }
}

const insertUserIntoDatabase = async (data) => {
    try {
        const insertUser = await Users.create(data)
        return insertUser
    } catch (error) {
        return { error }
    }
}

const updateUserInDatabase = async (data) => {
    const updateDataObj = {}

    for (let prop in data) {
        if (data[prop])
            updateDataObj[prop] = data[prop]
    }

    const { password } = updateDataObj
    if (password) updateDataObj.password = bcrypt.hashSync(password, 10)

    try {
        const updateUser = await Users.updateOne(
            { '_id': updateDataObj.id },
            { $set: updateDataObj }
        )
        return updateUser
    } catch (error) {
        return { error }
    }
}

const deleteUserFromDatabase = async (id) => {
    try {
        const deleteUser = await Users.deleteOne({ '_id': id })
        return deleteUser
    } catch (error) {
        return error
    }
}

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await getAllUsersFromDatabase()

        if (!users)
            return res.status(500).json({ message: 'Erro inesperado.' })

        return res.status(200).json({ users })
    },

    getUserById: async (req, res) => {
        const id = req.params.id

        if (!id)
            return res.status(400).json({ message: 'O id é um parâmetro obrigatório.' })

        const user = await getUserByIdFromDatabase(id)

        if (!user)
            return res.status(500).json({ message: 'Erro inesperado.' })

        const error = user.error

        if (error)
            if (error.name === 'CastError')
                return res.status(404).json({ message: 'Usuário não encontrado.' })

        return res.status(200).json({ user })
    },

    newUser: async (req, res) => {
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nickname: req.body.nickname,
            email: req.body.email,
            password: req.body.password,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            cpf: req.body.cpf,
            birthDate: req.body.birthDate
        }

        if (isDataMissing(data))
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' })

        if (!isEmailValid(data.email))
            return res.status(400).json({ message: 'Email inválido.' })

        if (!isCpfValid(data.cpf))
            return res.status(400).json({ message: 'CPF inválido.' })

        const insertUser = await insertUserIntoDatabase(data)

        if (!insertUser)
            return res.status(500).json({ message: 'Erro inesperado.' })

        const error = insertUser.error

        if (error)
            if (error.code === 11000)
                return res.status(409).json({
                    messages: `Um usuário com esse ${Object.keys(error.keyValue)} já está cadastrado.`
                })

        return res.status(201).json({ message: 'Usuário cadastrado', insertUser })
    },

    updateUser: async (req, res) => {
        const data = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nickname: req.body.nickname,
            email: req.body.email,
            password: req.body.password,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            cpf: req.body.cpf,
            birthDate: req.body.birthDate
        }

        if (!data.id)
            return res.status(400).json({ message: 'O id é um parâmetro obrigatório.' })

        if (data.email)
            if (!isEmailValid(data.email))
                return res.status(400).json({ message: 'Email inválido.' })

        if (data.cpf)
            if (!isCpfValid(data.cpf))
                return res.status(400).json({ message: 'CPF inválido.' })

        if (data.birthDate)
            if (!isDateValid(data.birthDate))
                return res.status(400).json({ message: 'Data de nascimento em formato inválido.' })

        const updateUser = await updateUserInDatabase(data)

        const error = updateUser.error

        if (error)
            if (error.code === 11000)
                return res.status(409).json({
                    messages: `Um usuário com esse ${Object.keys(error.keyValue)} já está cadastrado.`
                })

        if (!updateUser)
            return res.status(500).json({ message: 'Erro inesperado.' })

        return res.status(200).json({ message: 'Dados de usuário alterados.', updateUser })
    },

    deleteUser: async (req, res) => {
        const id = req.params.id

        const deleteUser = await deleteUserFromDatabase(id)

        if (!deleteUser)
            return res.status(500).json({ message: 'Erro inesperado.' })

        return res.status(200).json({ message: 'Usuário excluído.' })
    }
}