// const Sequelize = require('sequelize').Sequelize;
// const path = require('path');

// require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });

// const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
//   host: process.env.DATABASE_HOST,
//   dialect: 'mysql',
// });

// module.exports = sequelize;


import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../config.env') });


const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;


