const { Model, DataTypes } = require('sequelize')

class Customer extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'name cannot be null'
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'email cannot be null'
                    },
                    isEmail: true,
                }
            },
            cpf: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'cpf cannot be null'
                    }
                }
            },
            cnh: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'cnh cannot be null'
                    }
                }
            },
            phone: {
                type: DataTypes.STRING,
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

    static associate(models) {
        this.hasMany(models.Rent, { foreignKey: 'customer_id', as: 'rents' })
    }
}


module.exports = Customer