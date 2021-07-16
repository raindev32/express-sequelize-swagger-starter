'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      birth: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      password: {
        type: Sequelize.STRING
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      // facebook_id: {
      //   allowNull: true,
      //   autoIncrement: false,
      //   primaryKey: false,
      //   type: Sequelize.INTEGER,
      //   defaultValue: null
      // },
      // google_id: {
      //   allowNull: true,
      //   autoIncrement: false,
      //   primaryKey: false,
      //   type: Sequelize.INTEGER,
      //   defaultValue: null
      // },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
}
