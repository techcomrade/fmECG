"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      account_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        references: {
          model: "accounts",
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
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user_status",
          key: "id",
        },
      },
      information: Sequelize.TEXT("long"),
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user_role",
          key: "id",
        },
      },
      createdAt: {
        type: Sequelize.BIGINT,
      },
      updatedAt: {
        type: Sequelize.BIGINT,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
