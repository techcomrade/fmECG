"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("tokens", [
      {
        id: '090abf0e-f775-465c-b25a-8fa38fef8025',
        account_id: '86d1470c-de72-457c-a8e1-a616e55f463f',
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyOGVlNTc5LTc3MWItNGQzNC1hNjQ3LWIwNDJlMGMxZGY2MSIsImlhdCI6MTcxMTAyNjUyMiwiZXhwIjoxNzExMDI5NTIyfQ.kH1yuJgfpq5NFzb80LrEf-gV8ksNjYtylSokQHzAIoA',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyOGVlNTc5LTc3MWItNGQzNC1hNjQ3LWIwNDJlMGMxZGY2MSIsImlhdCI6MTcxMTAyNjUyMiwiZXhwIjoxNzk3NDI2NTIyfQ.-AGRKU9-mDSLwLiVoF2CR5aZEQy49rTpfzbCAcEL-S4',
        expires_at: '1711161793890',
        created_at: '1711161793890',
        updated_at: '1711161793890',
      },
      {
        id: '9c128953-e6b9-4d21-bb39-fdb0a04ed7bd',
        account_id: '1bd51bda-3179-4f27-bcfd-000e5c4a2aa7',
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyOGVlNTc5LTc3MWItNGQzNC1hNjQ3LWIwNDJlMGMxZGY2MSIsImlhdCI6MTcxMDg0Njg2MywiZXhwIjoxNzEwODQ5ODYzfQ.Lx5RyS3fTksxlcUP5WNOMnGh047_8xyiEDKR7EY22g4',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyOGVlNTc5LTc3MWItNGQzNC1hNjQ3LWIwNDJlMGMxZGY2MSIsImlhdCI6MTcxMDg0Njg2MywiZXhwIjoxNzk3MjQ2ODYzfQ.PA8nsFFZ6cWszIPkdHZa1WQN8oVcwNk-VXqp3qt2XiI',
        expires_at: '1711161793890',
        created_at: '1711161988658',
        updated_at: '1711161988658',
      },
      {
        id: 'f55faa1f-112c-458c-9e20-82de73961148',
        account_id: '83573421-9943-4a25-9fe1-00f0477aaba4',
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyOGVlNTc5LTc3MWItNGQzNC1hNjQ3LWIwNDJlMGMxZGY2MSIsImlhdCI6MTcxMDg0NjcyMywiZXhwIjoxNzEwODQ5NzIzfQ.oqHADHSmVk9NlVW2MzSbrvQkd0Uz3pwuZT9Om4_dpuw',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyOGVlNTc5LTc3MWItNGQzNC1hNjQ3LWIwNDJlMGMxZGY2MSIsImlhdCI6MTcxMDg0NjcyMywiZXhwIjoxNzk3MjQ2NzIzfQ.Euiq6SfKr2X6H_wAKwg6EKSjyIz-Uyx3Ip07NPhYnfE',
        expires_at: '1711161793890',
        created_at: '1711161997681',
        updated_at: '1711161997681',
      },
      {
        id: '944754d9-bb54-43b4-b9bc-4b5a9f3ed575',
        account_id: '22183931-6fc3-4518-af34-e86c8605b08a',
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJhM2RhY2M5LTU2MjgtNDFiMS04MGFlLWE5NTZjMTA1Mjg3NSIsImlhdCI6MTcxMTIwNzY0NywiZXhwIjoxNzExMjEwNjQ3fQ.BsYBYh_z2XYQ4uIwLLRLsca325BcYSIzgw9SZGaZQb0',
        expires_at: '1711161793890',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJhM2RhY2M5LTU2MjgtNDFiMS04MGFlLWE5NTZjMTA1Mjg3NSIsImlhdCI6MTcxMTIwNzY0NywiZXhwIjoxNzk3NjA3NjQ3fQ.dFx1Lm4B_L9_SojZuS7kAFaBma2N4pgGJZuoSWMWBec',
        created_at: '1711207647969',
        updated_at: '1711207647969',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tokens", null, {});
  },
};
