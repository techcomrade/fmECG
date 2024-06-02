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
        },
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
      data_rec_url: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      created_at: Sequelize.BIGINT,
      updated_at: Sequelize.BIGINT,
      dummy_data: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("records");
  },
};
