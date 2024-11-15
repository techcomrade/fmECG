"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("diagnosis", [
      {
        id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        schedule_id: "9b2a5f71-23b7-47c8-b9b5-4a7d5e5f6d3b",
        information: "Không có vấn đề",
        createdAt: "2024-10-09T16:51:43.000",
        updatedAt: "2024-10-09T16:51:43.000",
      },
      {
        id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a5",
        schedule_id: "6c28faba-d431-41db-a5a9-2dcb5fe2a241",
        information:
          "Tim đập nhanh, cần uống thuốc theo đơn và ăn uống giữ gìn sức khỏe",
        createdAt: "2024-10-09T16:51:43.000",
        updatedAt: "2024-10-09T16:51:43.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("diagnosis", null, {});
  },
};
