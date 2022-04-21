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
      // allowNull: false,
    }
  },
  userId: {
    type: DataTypes.UUID,
    validate: {
      // allowNull: false,
    }
  },
  storeId: {
    type: DataTypes.UUID,
    validate: {
      // allowNull: false,
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