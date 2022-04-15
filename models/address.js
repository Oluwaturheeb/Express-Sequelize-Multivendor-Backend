var {DataTypes} = require('sequelize');
var {uuidv7} = require('uuidv7');

const address = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    set () { return uuidv7()}
  },
  address: DataTypes.TEXT,
  lga: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  country: DataTypes.STRING,
  info: DataTypes.TEXT,
};

module.exports = address;