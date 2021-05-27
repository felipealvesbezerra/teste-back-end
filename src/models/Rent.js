const { Model, DataTypes } = require('sequelize')

class Rent extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            initial_date: DataTypes.DATE,
            final_date: DataTypes.DATE,
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