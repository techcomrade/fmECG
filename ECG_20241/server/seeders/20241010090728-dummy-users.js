"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        id: "1",
        account_id: "1",
        username: "Cồ Huy Dũng",
        gender: 1,
        birth: null,
        phone_number: "0774565665",
        image: null,
        role_id: 1,
        status_id: 1,
        information: "GOOD",
        createdAt: "2024-10-09T16:51:43.000",
        updatedAt: "2024-10-09T16:51:43.000",
      },
      {
        id: "3",
        account_id: "2",
        username: "Nguyễn Đức Dương",
        gender: 2,
        birth: null,
        phone_number: "0914875443",
        image: null,
        role_id: 1,
        status_id: 1,
        information: "GOOD",
        createdAt: "2024-10-09T17:33:25.000",
        updatedAt: "2024-10-09T17:33:25.000",
      },
      {
        id: "4",
        account_id: "3",
        username: "Trần Xuân Quyến",
        gender: 1,
        birth: null,
        phone_number: "0774333060",
        image: null,
        role_id: 1,
        status_id: 1,
        information: "GOOD",
        createdAt: "2024-10-10T03:56:20.000",
        updatedAt: "2024-10-10T03:56:20.000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
