"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("devices", [
      {
        id: '2a3cec92-682a-4d4e-be35-aff01cc5011a',
        user_id: '4df9ace1-0229-4756-b850-51a83cb0bb6e',
        doctor_id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df',
        device_name: 'Microlife Watch BP Home',
        information: 'do ap suat mau',
        device_type: 1,
        start_date: '1711189128343',
        status: 1,
        created_at: '1711189128343',
        updated_at: '1711189318343'
      },
      {
        id: '4404f003-1192-4aae-86e0-69dc273f181c',
        user_id: '4df9ace1-0229-4756-b850-51a83cb0bb6e',
        doctor_id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df',
        device_name: 'ECG',
        information: 'do dien tim',
        device_type: 2,
        start_date: '1711239328586',
        status: 0,
        created_at: '1711239328586',
        updated_at: '1711269112606'
      },
      {
        id: 'f224fd99-53fd-44c5-bcd4-5b6e3c960e78',
        user_id: '37ae5629-54ec-46e0-be65-9af6bd580b2b',
        doctor_id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df',
        device_name: 'ECG',
        information: 'do dien tim',
        device_type: 2,
        start_date: '1711324367820',
        status: 1,
        created_at: '1711324367820',
        updated_at: '1711364367231'
      }
    ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("devices", null, {});
  },
};
