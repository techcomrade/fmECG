"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("records", [
      {
        id: 'c9e6669b-f58f-47c7-80b8-43a4163553ff',
        user_id: '4df9ace1-0229-4756-b850-51a83cb0bb6e',
        device_id: '2a3cec92-682a-4d4e-be35-aff01cc5011a',
        record_type: 1,
        start_time: '1711189128343',
        end_time: '1711239128586',
        data_rec_url: 'https://www.verywellhealth.com/best-blood-pressure-monitors-4158050/quyentran',
        created_at: '1711189128343',
        updated_at: '1711229128712'
      },
      {
        id: 'c0f31b49-2449-45fa-8c93-55da998687f4',
        user_id: '4df9ace1-0229-4756-b850-51a83cb0bb6e',
        device_id: '4404f003-1192-4aae-86e0-69dc273f181c',
        record_type: 2,
        start_time: '1711239328586',
        end_time: '1711319128906',
        data_rec_url: 'https://www.docosan.com/blog/tim-mach/dien-tim/quyentran',
        created_at: '1711239328586',
        updated_at: '1711288127320'
      },
      {
        id: 'c2c9f725-2a71-4c5a-b3d2-6a4d774a1a42',
        user_id: '37ae5629-54ec-46e0-be65-9af6bd580b2b',
        device_id: 'f224fd99-53fd-44c5-bcd4-5b6e3c960e78',
        record_type: 2,
        start_time: '1711324367820',
        end_time: '1711434712320',
        data_rec_url: 'https://www.youtube.com/dung',
        created_at: '1711324367820',
        updated_at: '1711374913710'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("records", null, {});
  },
};
