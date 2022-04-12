import DataTypes from 'sequelize';

const orders = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true
    // defaultValue: DataTypes.UUIDV4
  },
  itemId: {
    type: DataTypes.INTEGER,
    // defaultValue: DataTypes.UUIDV4,
    validate: {
      isInt: true,
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    // defaultValue: DataTypes.UUIDV4,
    validate: {
      isInt: true,
    }
  },
};

export default orders;