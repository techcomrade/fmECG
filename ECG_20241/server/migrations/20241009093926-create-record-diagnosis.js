"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("record_diagnosis", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      record_id: {
        type: Sequelize.STRING,
        references: {
          model: "records",
          key: "id",
        },
        unique: true,
        onDelete: "CASCADE", 
        onUpdate: "SET NULL",
      },
      information: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("record_diagnosis");
  },
};

