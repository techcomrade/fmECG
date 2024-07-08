"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("registers", [
      {
        id: "f86068c7-08ed-4dfc-b96d-e0e1c0ae09df",
        email: "hung@gmail.com",
        password: "123456a@",
        username: "dsdfs",
        gender: 0,
        birth: "17052003",
        phone_number: "0912234888",
        image: "01201020120abc",
        status: 0,
        information: "đo huyết áp và nhịp tim",
        role: 1,
        note: "",
        created_at: "1711115945125",
        updated_at: "1711115945125",
      },
      {
        id: "4df9ace1-0229-4756-b850-51a83cb0bb6e",
        email: "hung1@gmail.com",
        password: "123456a@",
        username: "qhai",
        gender: 1,
        birth: "1232367",
        phone_number: "09122348767",
        image: "0101010101abc",
        status: 0,
        information: "đo huyết áp và nhịp tim",
        role: 0,
        note: "",
        created_at: "1711118359957",
        updated_at: "1711118359957",
      },
      {
        id: "37ae5629-54ec-46e0-be65-9af6bd500b3b",
        email: "hung2@gmail.com",
        password: "123456a@",
        username: "namsd",
        gender: 0,
        birth: "1232366",
        phone_number: "09122348669",
        image: "010101010100abc",
        status: 0,
        information: "đo huyết áp vàdfdf nhịp tim",
        role: 2,
        note: "",
        created_at: "1711121415247",
        updated_at: "1711121415247",
      },
      {
        id: "178d7109-7568-472c-9350-2db42aa152f6",
        email: "hung3@gmail.com",
        password: "123456a@",
        username: "grg",
        gender: 1,
        birth: "123236811",
        phone_number: "091223486384",
        image: "01010101010110abc",
        status: 0,
        information: "đo huyết áp và nhịp tim",
        role: 1,
        note: "",
        created_at: "1711206172234",
        updated_at: "1711206172234",
      },
      {
        id: "37ae5629-54ec-46e0-be65-9af6bd580b2b",
        email: "hung4@gmail.com",
        password: "123456a@",
        username: "abcfdfd",
        gender: 0,
        birth: "1232366",
        phone_number: "09122348669",
        image: "010101010100abc",
        status: 0,
        information: "đo huyết áp và nhịp tim",
        role: 2,
        note: "",
        created_at: "1711121415247",
        updated_at: "1711121415247",
      },
      {
        id: "37ae5629-54ec-46e0-be65-9af6bd580b3b",
        email: "hung5@gmail.com",
        password: "123456a@",
        username: "dâcdcso",
        gender: 1,
        birth: "1232366",
        phone_number: "09122348669",
        image: "010101010100abc",
        status: 0,
        information: "đo huyết áp và nhịp tim",
        role: 2,
        note: "",
        created_at: "1711121415247",
        updated_at: "1711121415247",
      },
      {
        id: "37ae5629-54ec-46e0-be65-9af6bd580b4b",
        email: "hung6@gmail.com",
        password: "123456a@",
        username: "huocdscng",
        gender: 1,
        birth: "1232366",
        phone_number: "09122348669",
        image: "010101010100abc",
        status: 0,
        information: "đo huyết áp và nhịp tim",
        role: 2,
        note: "",
        created_at: "1711121415247",
        updated_at: "1711121415247",
      },
      {
        id: "37ae5629-54ec-46e0-be65-9af6bd510b2b",
        email: "hung7@gmail.com",
        password: "123456a@",
        username: "tievdvn",
        gender: 0,
        birth: "1232366",
        phone_number: "09122348669",
        image: "010101010100abc",
        status: 0,
        information: "đo huyết áp và nhịp tim",
        role: 2,
        note: "",
        created_at: "1711121415247",
        updated_at: "1711121415247",
      },
      {
        id: "37ae5629-54ec-46e0-be65-9af6bd680b2b",
        email: "hung8@gmail.com",
        password: "123456a@",
        username: "nsdvdsvam",
        gender: 0,
        birth: "1232366",
        phone_number: "09122348669",
        image: "010101010100abc",
        status: 0,
        information: "đo huyết áp và nhịp tim",
        role: 2,
        note: "",
        created_at: "1711121415247",
        updated_at: "1711121415247",
      },
      {
        id: "37ae5629-54ec-46e0-be45-9af6bd580b2b",
        email: "hung9@gmail.com",
        password: "123456a@",
        username: "hoewfang",
        gender: 0,
        birth: "1232366",
        phone_number: "09122348669",
        image: "010101010100abc",
        status: 0,
        information: "đo huyết áp và nhịp tim",
        role: 2,
        note: "",
        created_at: "1711121415247",
        updated_at: "1711121415247",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("registers", null, {});
  },
};
