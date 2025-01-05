"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("revenue_statistics", [
      {
        id: "7e9a8b2c-3d4e-4f56-8a9b-0c1d2e3f4a5b",
        schedule_id: "9b2a5f71-23b7-47c8-b9b5-4a7d5e5f6d3b",
        schedule_type: 2,
        patient_id: "bc372cb1-2e6f-4727-b2ad-bd041bd9fbb5",
        doctor_id: "ae4f7c10-5e36-4f9d-a02b-0a76f4d612e3",
        serviceType: 1, 
        fee: 150000.00,
        discount: 0.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
        schedule_id: "6c28faba-d431-41db-a5a9-2dcb5fe2a241",
         schedule_type: 1,
        patient_id: "ecb4b5a1-58f6-4b33-bc26-d8bca0c2f22e",
        doctor_id: "de5824b0-781b-4ad5-943b-604714fd9113",
        serviceType: 2, 
        fee: 200000.00,
         discount: 10000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
         schedule_id: "6c28faba-d431-41db-a5a9-2dcb5fh2a241",
         schedule_type: 1,
        patient_id: "d1c344b0-23a6-4c15-9b5b-927f55f22ae4",
        doctor_id: "ae4f7c10-5e36-4f9d-a02b-0a76f4d612e3",
        serviceType: 1,
        fee: 120000.00,
        discount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    {
        id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
         schedule_id: "6c28faba-d431-41db-a5a9-2dcb5fh2a211",
         schedule_type: 1,
        patient_id: "f3a45cb9-1d8a-4f1e-92e4-5c731d0b45a4",
         doctor_id: "de5824b0-781b-4ad5-943b-604714fd9113",
        serviceType: 1,
         fee: 150000.00,
         discount: 20000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
      
       id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6e",
         schedule_id: "7c28faba-d431-41db-a5a9-2dcb5fh2a211",
         schedule_type: 2,
        patient_id: "bc372cb1-2e6f-4727-b2ad-bd041bd9fbb5",
        doctor_id: "ae4f7c10-5e36-4f9d-a02b-0a76f4d612e3",
       serviceType: 2,
       fee: 100000.00,
        discount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("revenue_statistics", null, {});
  },
};