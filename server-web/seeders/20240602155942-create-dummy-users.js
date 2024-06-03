'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert('users', [
      {
        id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df',
        account_id: '86d1470c-de72-457c-a8e1-a616e55f463f',
        username: 'duong',
        gender: 0,
        birth: '17052003',
        phone_number: '0912234888',
        image: '01201020120abc',
        status: 0,
        information: 'đo huyết áp và nhịp tim',
        role: 1,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: '4df9ace1-0229-4756-b850-51a83cb0bb6e',
        account_id: '1bd51bda-3179-4f27-bcfd-000e5c4a2aa7',
        username: 'qtv',
        gender: 1,
        birth: '1232367',
        phone_number: '09122348767',
        image: '0101010101abc',
        status: 0,
        information: 'đo huyết áp và nhịp tim',
        role: 0,
        created_at: '1711118359957',
        updated_at: '1711118359957'
      },
      {
        id: '37ae5629-54ec-46e0-be65-9af6bd500b3b',
        account_id: '83573421-9943-4a25-9fe1-00f0477aaba4',
        username: 'he',
        gender: 0,
        birth: '1232366',
        phone_number: '09122348669',
        image: '010101010100abc',
        status: 0,
        information: 'đo huyết áp vàdfdf nhịp tim',
        role: 2,
        created_at: '1711121415247',
        updated_at: '1711121415247'
      },
      {
        id: '178d7109-7568-472c-9350-2db42aa152f6',
        account_id: '22183931-6fc3-4518-af34-e86c8605b08a',
        username: 'dhsh',
        gender: 1,
        birth: '123236811',
        phone_number: '091223486384',
        image: '01010101010110abc',
        status: 0,
        information: 'đo huyết áp và nhịp tim',
        role: 1,
        created_at: '1711206172234',
        updated_at: '1711206172234'
      },
      {
        id: '37ae5629-54ec-46e0-be65-9af6bd580b2b',
        account_id: '83573421-9943-4a25-9fe1-00f0477aaba9',
        username: 'abc',
        gender: 0,
        birth: '1232366',
        phone_number: '09122348669',
        image: '010101010100abc',
        status: 0,
        information: 'đo huyết áp và nhịp tim',
        role: 2,
        created_at: '1711121415247',
        updated_at: '1711121415247'
      },
      {
        id: '37ae5629-54ec-46e0-be65-9af6bd580b3b',
        account_id: '83573421-9943-4a25-9fe1-00f0477aaba8',
        username: 'dâo',
        gender: 1,
        birth: '1232366',
        phone_number: '09122348669',
        image: '010101010100abc',
        status: 0,
        information: 'đo huyết áp và nhịp tim',
        role: 2,
        created_at: '1711121415247',
        updated_at: '1711121415247'
      },
      {
        id: '37ae5629-54ec-46e0-be65-9af6bd580b4b',
        account_id: '83573421-9943-4a25-9fe1-00f0477aaba2',
        username: 'huong',
        gender: 1,
        birth: '1232366',
        phone_number: '09122348669',
        image: '010101010100abc',
        status: 0,
        information: 'đo huyết áp và nhịp tim',
        role: 2,
        created_at: '1711121415247',
        updated_at: '1711121415247'
      },
      {
        id: '37ae5629-54ec-46e0-be65-9af6bd510b2b',
        account_id: '83573421-9943-4a25-9fe1-00f0477aaba6',
        username: 'tien',
        gender: 0,
        birth: '1232366',
        phone_number: '09122348669',
        image: '010101010100abc',
        status: 0,
        information: 'đo huyết áp và nhịp tim',
        role: 2,
        created_at: '1711121415247',
        updated_at: '1711121415247'
      },
      {
        id: '37ae5629-54ec-46e0-be65-9af6bd680b2b',
        account_id: '83573421-9943-4a25-9fe1-00f0477aaba5',
        username: 'nam',
        gender: 0,
        birth: '1232366',
        phone_number: '09122348669',
        image: '010101010100abc',
        status: 0,
        information: 'đo huyết áp và nhịp tim',
        role: 2,
        created_at: '1711121415247',
        updated_at: '1711121415247'
      },
      {
        id: '37ae5629-54ec-46e0-be45-9af6bd580b2b',
        account_id: '83573421-9943-4a25-9fe1-00f0477aaba1',
        username: 'hoang',
        gender: 0,
        birth: '1232366',
        phone_number: '09122348669',
        image: '010101010100abc',
        status: 0,
        information: 'đo huyết áp và nhịp tim',
        role: 2,
        created_at: '1711121415247',
        updated_at: '1711121415247'
      }
    ]
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
