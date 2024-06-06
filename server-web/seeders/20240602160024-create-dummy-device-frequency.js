"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("device_frequency", [
      {
        id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df',
        device_id: '4404f003-1192-4aae-86e0-69dc273f181c',
        frequency_name: 'spo2(ms)',
        information: 'tín hiệu điện tim',
        value: 100,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'b5dc2e2a-dcb1-4903-9054-02e242f5cd55',
        device_id: '4404f003-1192-4aae-86e0-69dc273f181c',
        frequency_name: 'so2(ms)',
        information: 'tín hiệu điện tim',
        value: 200,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae19df',
        device_id: '2a3cec92-682a-4d4e-be35-aff01cc5011a',
        frequency_name: 'o2(ms)',
        information: 'tín hiệu điện tim',
        value: 300,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae29df',
        device_id: 'f224fd99-53fd-44c5-bcd4-5b6e3c960e78',
        frequency_name: 's2(ms)',
        information: 'tín hiệu điện tim',
        value: 100,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae08df',
        device_id: 'f224fd99-53fd-44c5-bcd4-5b6e3c960e78',
        frequency_name: 'p2(ms)',
        information: 'tín hiệu điện tim',
        value: 100,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      }
    ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("device_frequency", null, {});
  },
};
