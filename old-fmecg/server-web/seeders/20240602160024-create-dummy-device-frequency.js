"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("device_details", [
      {
        id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae09df',
        device_id: '4404f003-1192-4aae-86e0-69dc273f181c',
        detail_name: 'PPG',
        information: 'tín hiệu âm thanh tim',
        value: '100',
        detail_type: 1,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'b5dc2e2a-dcb1-4903-9054-02e242f5cd55',
        device_id: '4404f003-1192-4aae-86e0-69dc273f181c',
        detail_name: 'PCG',
        information: 'tín hiệu điện tim',
        value: '200',
        detail_type: 1,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae19df',
        device_id: '2a3cec92-682a-4d4e-be35-aff01cc5011a',
        detail_name: 'ECG',
        information: 'tín hiệu điện tim',
        value: '300',
        detail_type: 1,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae29df',
        device_id: 'f224fd99-53fd-44c5-bcd4-5b6e3c960e78',
        detail_name: 'ECG',
        information: 'tín hiệu điện tim',
        value: '100',
        detail_type: 1,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'f86068c7-08ed-4dfc-b96d-e0e1c0ae08df',
        device_id: 'f224fd99-53fd-44c5-bcd4-5b6e3c960e78',
        detail_name: 'PPG',
        information: 'tín hiệu điện tim',
        value: '100',
        detail_type: 1,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'f89068c7-08ed-4dfc-b96d-e0e1c0ae09df',
        device_id: '4404f003-1192-4aae-86e0-69dc273f181c',
        detail_name: 'BLE',
        information: 'Kết nối Bluetooth tiết kiệm điện năng',
        value: '100',
        detail_type: 2,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'b9dc2e2a-dcb1-4903-9054-02e242f5cd55',
        device_id: '4404f003-1192-4aae-86e0-69dc273f181c',
        detail_name: 'Wifi',
        information: 'Kết nối wifi',
        value: '200',
        detail_type: 2,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'f86068c6-08ed-4dfc-b96d-e0e1c0ae19df',
        device_id: '2a3cec92-682a-4d4e-be35-aff01cc5011a',
        detail_name: 'Cable',
        information: 'Kết nối dây',
        value: '300',
        detail_type: 2,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'f86068c7-68ed-4dfc-b96d-e0e1c0ae29df',
        device_id: 'f224fd99-53fd-44c5-bcd4-5b6e3c960e78',
        detail_name: 'Bluetooth',
        information: 'Kết nối Bluetooth',
        value: '100',
        detail_type: 2,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'f86068c7-88ed-4dfc-b36d-e0e1c0ae08df',
        device_id: 'f224fd99-53fd-44c5-bcd4-5b6e3c960e78',
        detail_name: 'BLE',
        information: 'Kết nối Bluetooth tiết kiệm điện năng',
        value: '100',
        detail_type: 2,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'f89018c7-08ed-4dfc-b96d-e0e1c0ae09df',
        device_id: '4404f003-1192-4aae-86e0-69dc273f181c',
        detail_name: 'SD Card',
        information: 'Lưu trữ trong thẻ nhớ',
        value: '100Gb',
        detail_type: 3,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'b9dc2e2a-dcb1-4903-9054-02e252f5cd55',
        device_id: '4404f003-1192-4aae-86e0-69dc273f181c',
        detail_name: 'Local storage',
        information: 'Bộ nhớ cục bộ',
        value: '200Mb',
        detail_type: 2,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'f86068c6-08ed-4dfc-b96d-e0e4c0ae19df',
        device_id: '2a3cec92-682a-4d4e-be35-aff01cc5011a',
        detail_name: 'SD card',
        information: 'Lưu trữ trong thẻ nhớ',
        value: '3Gb',
        detail_type: 2,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      },
      {
        id: 'f86068c7-88ed-4dfc-b36d-e0e1g0ae08df',
        device_id: 'f224fd99-53fd-44c5-bcd4-5b6e3c960e78',
        detail_name: 'Local storage',
        information: 'Lữu trữ trong bộ nhớ cục bộ',
        value: '100Mb',
        detail_type: 2,
        created_at: '1711115945125',
        updated_at: '1711115945125'
      }
    ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("device_details", null, {});
  },
};
