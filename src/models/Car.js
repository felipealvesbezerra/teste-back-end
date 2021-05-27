const { Model, DataTypes } = require('sequelize')

class Car extends Model {
    static init(sequelize) {
        super.init({
            plate: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Plate cannot be null'
                    }
                }
            },
            color: DataTypes.STRING,
            model: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Model cannot be null'
                    }
                }
            },
            year: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Year cannot be null'
                    }
                }
            },
            daily: DataTypes.FLOAT
        },
            {
                sequelize
            })
    }

    static associate(models) {
        this.hasMany(models.Rent, { foreignKey: 'car_id', as: 'cars' })
    }
}


module.exports = Car