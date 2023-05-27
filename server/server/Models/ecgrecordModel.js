const Sequelize = require('sequelize');
const sequelize = require('../util/db');
const User = require('./userModel');

const EcgRecords = sequelize.define('ecgrecords1', {
  record_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  device_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  data_directory: {
    type: Sequelize.STRING,
    allowNull: false
  },
  start_time: {
    type: Sequelize.DATE,
    allowNull: false
  },
  stop_time: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

User.hasMany(EcgRecords, { foreignKey: 'user_id' });
EcgRecords.belongsTo(User, { foreignKey: 'user_id' });

module.exports = EcgRecords;



// const Sequelize = require('sequelize');
// const sequelize = require('../util/db');
// const User = require('./userModel');

// const EcgRecord = sequelize.define('ecgrecords8', {
//   record_id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   user_id: {
//     type: Sequelize.INTEGER,
//     allowNull: true,
//     // references: {
//     //   model: User,
//     //   key: 'user_id'
//     // }
//   },
//   device_id: {
//     type: Sequelize.STRING,
//     allowNull: true
//   },
//   data_directory: {
//     type: Sequelize.STRING,
//     allowNull: true
//   },
//   start_time: {
//     type: Sequelize.STRING,
//     allowNull: true
//   },
//   stop_time: {
//     type: Sequelize.STRING,
//     allowNull: true
//   }
// });

// // User.hasMany(EcgRecords, { foreignKey: 'user_id' });
// // EcgRecords.belongsTo(User, { foreignKey: 'user_id' });

// module.exports = EcgRecord;
