'use strict'

const { DataTypes } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {

     return queryInterface.createTable('cars', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      plate: {
        type: Sequelize.STRING,
        allowNull: false
      }, 
      color: {
        type: Sequelize.STRING,
      }, 
      model: {
        type: Sequelize.STRING,
        allowNull: false
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: false
      },
      year: {
        type: Sequelize.STRING,
        allowNull: false
      },
      daily: {
        type: Sequelize.FLOAT,
      }, 
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
     })

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cars')

  }
};
