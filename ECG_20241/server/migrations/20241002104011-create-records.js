"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("records", {
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
        }
      },
      device_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "devices",
          key: "id",
        },
      },
      record_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      start_time: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      data_record_url: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("records");
  },
};
