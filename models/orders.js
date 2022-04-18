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
      allowNull: false,
      isUUID: true
    }
  },
  userId: {
    type: DataTypes.UUID,
    validate: {
      allowNull: false,
      isUUID: true,
    }
  },
  storeId: {
    type: DataTypes.UUID,
    validate: {
      allowNull: false,
      isUUID: true,
    }
  },
  quantity: DataTypes.INTEGER,
  status: {
    type: DataTypes.ENUM('order', 'shipped', 'onroute', 'rescheduled', 'delivered'),
    defaultValue: 'order',
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  paymentType: DataTypes.ENUM('ONDELIVERY', 'ONLINE')
};

export default orders;