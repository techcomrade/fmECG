'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('registers', 
      {
        id: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        email:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        password:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        gender: {
          type: Sequelize.INTEGER,
        },
        birth: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        phone_number: Sequelize.STRING,
        image: Sequelize.STRING,
        status: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        information:  Sequelize.TEXT('long'),
        role: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        note: {
          type: Sequelize.STRING,
        },
        created_at: Sequelize.BIGINT,
        updated_at: Sequelize.BIGINT,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('register');
  }
};
