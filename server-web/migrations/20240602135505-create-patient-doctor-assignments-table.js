"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "patient_doctor_assignment",
      {
        id: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        patient_id: {
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
        start_date: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        end_date: {
          type: Sequelize.BIGINT,
        },
        created_at: {
          type: Sequelize.BIGINT,
        },
        updated_at: {
          type: Sequelize.BIGINT,
        },
        dummy_data: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
      },
      { freezeTableName: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("patient_doctor_assignment");
  },
};
