import {DataTypes} from 'sequelize';
import app from '../conf/app.js';

const reviews = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  itemId: {
    type: DataTypes.UUID,
    references: {
      model: 'items',
      allowNull: false,
      unique: 'compositeUniqueKey'
    },
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      allowNull: false,
      unique: 'compositeUniqueKey'
    },
  },
  content: DataTypes.TEXT,
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  flag: {
    defaultValue: (() => {
      let status;
      (app.autoApproveReviews) ? status = 'approved' : status = 'pending';
      return status;
    })(),
    type: DataTypes.ENUM('pending', 'approved')
  },
};

export default reviews;