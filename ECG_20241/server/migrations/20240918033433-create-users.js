'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', 
      {
        id: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        account_id: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: 'accounts',
            key: "id",
          },
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        gender: {
          type: Sequelize.INTEGER,
        },
        birth: {
          type: Sequelize.DATE,
          allowNull: true,
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
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
