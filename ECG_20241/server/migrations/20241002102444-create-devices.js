"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("devices", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      doctor_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      device_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      information: {
        type: Sequelize.TEXT,
      },
      device_type: {
        type: Sequelize.INTEGER,
      },
      start_date: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("devices");
  },
};
