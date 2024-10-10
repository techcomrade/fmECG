"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("accounts", [
      {
        id: "1",
        email: "codung2909@gmail.com",
        password: "123",
        createdAt: "2024-10-09T15:48:48.000",
        updatedAt: "2024-10-09T15:48:48.000",
      },
      {
        id: "2",
        email: "nguyenduong1705@gmail.com",
        password: "123",
        createdAt: "2024-10-09T16:07:09.000",
        updatedAt: "2024-10-09T16:07:09.000",
      },
      {
        id: "3",
        email: "trantuan7541@gmail.com",
        password: "123",
        createdAt: "2024-10-09T16:08:24.000",
        updatedAt: "2024-10-09T16:08:24.000",
      },
      {
        id: "4",
        email: "tranquyen@gmail.com",
        password: "123",
        createdAt: "2024-10-10T03:52:29.000",
        updatedAt: "2024-10-10T03:52:29.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("accounts", null, {});
  },
};
