const { Model, DataTypes } = require('sequelize')

class Rent extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            initial_date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'initial_date cannot be null'
                    },
                    isDate: true
                }
            },
            final_date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'final_date cannot be null'
                    },
                    isDate: true
                }
            },
        },
            {
                sequelize
            })
    }

    static associate(models) {
        this.belongsTo(models.Customer, { foreignKey: 'customer_id', as: 'customer'})
        this.belongsTo(models.Car, { foreignKey: 'car_id', as: 'cars'})
    }
}


module.exports = Rent