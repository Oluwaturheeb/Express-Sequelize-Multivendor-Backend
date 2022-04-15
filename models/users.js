var DataTypes = require('sequelize');
var {uuidv7} = require('uuidv7');

const users = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    set (value) {
      console.log(value, uuidv7())
      this.setDataValue('id', uuidv7())
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  avatar: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: true,
  }
};

module.exports = users;