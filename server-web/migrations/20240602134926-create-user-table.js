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
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        phone_number: Sequelize.STRING,
        image: Sequelize.STRING,
        status: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        information: Sequelize.STRING,
        role: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        created_at: Sequelize.BIGINT,
        updated_at: Sequelize.BIGINT,
      },
      {
        associate: function (models) {
          User.hasMany(models.Assignment, {
            onDelete: "cascade",
          });
        },
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
