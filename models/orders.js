var {DataTypes} = require( 'sequelize');
var {uuidv7} = require( 'uuidv7');

const orders = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    set () {
      return uuidv7();
    },
  },
  itemId: {
    type: DataTypes.UUID,
    validate: {
      isUUID: true
    }
  },
  userId: {
    type: DataTypes.UUID,
    validate: {
      isUUID: true,
    }
  },
  quantity: DataTypes.INTEGER,
};

module.exports = orders;