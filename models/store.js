import {DataTypes} from 'sequelize';
import {uuidv7} from 'uuidv7';

const store = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  userId: DataTypes.UUID,
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: DataTypes.STRING,
  avatar: DataTypes.TEXT,
  phone: DataTypes.BIGINT,
  long: DataTypes.FLOAT,
  lat: DataTypes.FLOAT,
  nationality: DataTypes.STRING,
  verifyPhone: {
    type: DataTypes.ENUM('0', '1'),
    defaultValue: '0',
  },
  verifyEmail: {
    type: DataTypes.ENUM('0', '1'),
    defaultValue: '0',
  },
  status: {
    type: DataTypes.ENUM('ACTIVE', 'BLOCKED'),
    defaultValue: 'ACTIVE'
  }
};

export default store;