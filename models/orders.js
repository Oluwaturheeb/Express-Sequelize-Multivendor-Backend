import {DataTypes} from 'sequelize';

const orders = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
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

export default orders;