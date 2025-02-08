"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("diagnosis", [
      {
        id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        schedule_id: "089726fe-9153-46c6-8557-26ebaec0567f",
        information: "Không có vấn đề",
        createdAt: "2024-10-09T16:51:43.000",
        updatedAt: "2024-10-09T16:51:43.000",
      },
      {
        id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a5",
        schedule_id: "10226b17-5833-4508-9b6a-9ed16ecfc6ae",
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
