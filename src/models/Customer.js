const { Model, DataTypes } = require('sequelize')

class Customer extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true,
                }
            },
            cpf: DataTypes.STRING,
            cnh: DataTypes.STRING,
            phone: {
                type: DataTypes.DOUBLE,
                validate: {
                    len: [8, 12],
                }
            },
            birth_date: DataTypes.STRING,
            profession: DataTypes.STRING,
            address: DataTypes.STRING,
            zip: DataTypes.STRING,
            city: DataTypes.STRING,
            state: DataTypes.STRING
        },
            {
                sequelize
            })
    }
}


module.exports = Customer