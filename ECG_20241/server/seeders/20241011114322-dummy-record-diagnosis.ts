"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("record_diagnosis", [
      {
        id: "1",
        record_id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45ab",
        information: "record diagnosis information",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "2",
        record_id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        information: "record is updated",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("record_diagnosis", null, {});
  },
};
