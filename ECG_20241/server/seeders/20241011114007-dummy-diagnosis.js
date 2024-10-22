"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("diagnosis", [
      {
        id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        schedule_id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        information: "",
        createdAt: "2024-10-09T16:51:43.000",
        updatedAt: "2024-10-09T16:51:43.000",
      },
      {
        id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a5",
        schedule_id: "6c28faba-d431-41db-a5a9-2dcb5fe2a241",
        information: "",
        createdAt: "2024-10-09T16:51:43.000",
        updatedAt: "2024-10-09T16:51:43.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("diagnosis", null, {});
  },
};
