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
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE", 
        onUpdate: "SET NULL",
      },
      device_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      information: {
        type: Sequelize.TEXT,
      },
      device_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "device_type",
          key: "id",
        },
      },
      start_time: {
        type: Sequelize.BIGINT,
      },
      end_time: {
        type: Sequelize.BIGINT,
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "device_status",
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
    await queryInterface.dropTable("devices");
  },
};
