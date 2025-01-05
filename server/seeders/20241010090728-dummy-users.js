'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        id: "ae4f7c10-5e36-4f9d-a02b-0a76f4d612e3",
        account_id: "ae4f7c10-5e36-4f9d-a02b-0a76f4d612e3",
        username: "Phạm Ngọc Sơn",
        gender: 1,
        birth: 1053190800,
        phone_number: "0389669315",
        image: null,
        role_id: 2,
        status_id: 1,
        information: "Bác sĩ",
        email: "son2412@gmail.com",
        password:
          "2412202Son@",
        createdAt: "2024-10-09T16:51:43.000",
        updatedAt: "2024-10-09T16:51:43.000",
      },
      {
        id: "de5824b0-781b-4ad5-943b-604714fd9113",
        account_id: "de5824b0-781b-4ad5-943b-604714fd9113",
        username: "Mai Phương Thảo",
        gender: 2,
        birth: 1053104400,
        phone_number: "0914875443",
        image: null,
        role_id: 2,
        status_id: 1,
        information: "Bác sĩ",
        email: "thao1402@gmail.com",
        password:
          "2412202Son@",
        createdAt: "2024-10-09T17:33:25.000",
        updatedAt: "2024-10-09T17:33:25.000",
      },
      {
        id: "9dc38d89-55d1-4d41-8bfb-c885bc6ff0be",
        account_id: "b067fcbc-c471-4898-a3f7-850b27d40796",
        username: "Phạm Ngọc Sơn 2",
        gender: 1,
        birth: 1049562000,
        phone_number: "0774333060",
        image: null,
        role_id: 1,
        status_id: 1,
        information: "Admin",
        email: "son24122@gmail.com",
        password:
          "2412202Son@",
        createdAt: "2024-10-10T03:56:20.000",
        updatedAt: "2024-10-10T03:56:20.000",
      },
       {
        id: "b067fcbc-c471-4898-a3f7-850b27d40797",
        account_id: "9dc38d89-55d1-4d41-8bfb-c885bc6ff0be",
        username: "Trần Xuân Quyến",
        gender: 1,
        birth: 1049562000,
        phone_number: "0774333060",
        image: null,
        role_id: 2,
        status_id: 1,
        information: "Bác sĩ chuyên khoa",
        email: "tranquyen@gmail.com",
         password:
          "2412202Son@",
        createdAt: "2024-10-10T03:56:20.000",
        updatedAt: "2024-10-10T03:56:20.000",
      },
      {
        id: "f7c1c6c7-a839-44c1-98e7-01b891f07c2f",
        account_id: "13b8a64f-6311-4ae4-a25a-7f5b77b64852",
        username: "Phạm Quang Huy",
        gender: 1,
        birth: 1049562000,
        phone_number: "0774333060",
        image: null,
        role_id: 3,
        status_id: 1,
        information: "Bệnh nhân mới",
        email: "huyquangpham@gmail.com",
         password:
          "2412202Son@",
        createdAt: "2024-10-10T03:56:20.000",
        updatedAt: "2024-10-10T03:56:20.000",
      },
      {
        id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
        account_id: "f7c1c6c7-a839-44c1-98e7-01b891f07c2f",
        username: "Lê Đức Thuận",
        gender: 1,
        birth: 1047229200,
        phone_number: "0779988776",
        image: null,
        role_id: 3,
        status_id: 1,
        information: "Bệnh nhân có tiền sử bệnh tim",
         email: "lethuan2212@gmail.com",
          password:
          "2412202Son@",
        createdAt: "2024-10-11T12:35:12.000",
        updatedAt: "2024-10-11T12:35:12.000"
    },
    {
        id: "bc372cb1-2e6f-4727-b2ad-bd041bd9fbb5",
        account_id: "c8d5a8b9-7735-402d-841d-7a2a958ce88e",
        username: "Hoàng Kiều Nhung",
        gender: 2,
        birth: 1047229200,
        phone_number: "0796543210",
        image: null,
        role_id: 3,
        status_id: 1,
        information: "Bệnh nhân dị ứng với amocxilin",
        email: "hoangnhung3108@gmail.com",
        password:
          "2412202Son@",
        createdAt: "2024-10-12T09:20:55.000",
        updatedAt: "2024-10-12T09:20:55.000"
    },
    {
        id: "ecb4b5a1-58f6-4b33-bc26-d8bca0c2f22e",
        account_id: "43fa2d3f-58b2-4867-8aaf-c29b39b4c7be",
        username: "Nguyễn Thanh Bình",
        gender: 1,
        birth: 1047229200, 
        phone_number: "0781234567",
        image: null,
        role_id: 3,
        status_id: 1,
        information: "Bệnh nhân mới",
         email: "nguyenbinh0507@gmail.com",
          password:
          "2412202Son@",
        createdAt: "2024-10-12T13:50:33.000",
        updatedAt: "2024-10-12T13:50:33.000"
    },
    {
        id: "d1c344b0-23a6-4c15-9b5b-927f55f22ae4",
        account_id: "70f74b32-405e-4de1-bcd7-27d421f8c20b",
        username: "Phùng Trần Đức Anh",
        gender: 1,
        birth: 1047229200, 
        phone_number: "0764561234",
        image: null,
        role_id: 3,
        status_id: 1,
        information: "Bệnh nhân ổn định",
        email: "phongtran2209@gmail.com",
        password:
          "2412202Son@",
        createdAt: "2024-10-13T17:27:43.000",
        updatedAt: "2024-10-13T17:27:43.000"
    },
    {
        id: "e0b5b67e-d69f-4ad8-b922-83cfc2d7ac2f",
        account_id: "8d4377d3-8c4d-43c4-bb29-207c5cf074ef",
        username: "Nguyễn Ngọc Quỳnh",
        gender: 2,
        birth: 1047229200,
        phone_number: "0758765432",
        image: null,
        role_id: 3,
        status_id: 1,
        information: "Bệnh nhân ổn định",
        email: "ngocquynh0410@gmail.com",
         password:
          "2412202Son@",
        createdAt: "2024-10-14T08:55:10.000",
        updatedAt: "2024-10-14T08:55:10.000"
    }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};