const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const Car = require('../models/Car')
const Customer = require('../models/Customer')
const Rent = require('../models/Rent')


const connection = new Sequelize(dbConfig)

Customer.init(connection)
Rent.init(connection)
Car.init(connection)

Rent.associate(connection.models)
Customer.associate(connection.models)
Car.associate(connection.models)

module.exports = connection