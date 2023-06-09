import { DataTypes } from 'sequelize';
import sequelize from '../util/db.js';

const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true // Validate email format
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  doB: {
    // TODO: Update type to DateTime
    type: DataTypes.DATE,
    allowNull: false,
    set(value) {
      if (typeof value === 'string') {
        // Assuming the input date format is "DD-MM-YYYY"
        const [day, month, year] = value.split('-');
        const formattedDate = `${year}-${month}-${day}`;
        this.setDataValue('doB', new Date(formattedDate));
      } else {
        this.setDataValue('doB', value);
      }
    }
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true, // Validate numeric characters only
      len: [10, 15] // Validate phone number length between 10 and 15 characters
    }
  },
  role: {
    type: DataTypes.INTEGER, // 0-patient, 1-doctor, 2-admin
    allowNull: false,
    validate: {
      min: 0, // Minimum value for role field
      max: 2 // Maximum value for role field
    }
  }
}, 
{
  updatedAt: 'updated_at',
  createdAt: 'create_at',
  tableName: 'users'
});

export default User;
