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
    },
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
    },
  },
  content: DataTypes.TEXT,
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
};

export default reviews;