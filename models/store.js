var {DataTypes} = require( 'sequelize');
var {uuidv7} = require( 'uuidv7');

const store = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    set () { return uuidv7()}
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
};

module.exports = store;