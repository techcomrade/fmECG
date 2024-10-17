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
        references: {
          model: "accounts",
          key: "id",
        },
        unique: true,
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
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user_status",
          key: "id",
        },
      },
      information: {
        type: Sequelize.TEXT,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user_role",
          key: "id",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
