import {DataTypes} from 'sequelize';
import app from '../conf/app.js';

const categories = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      allowNull: false
    }
  },
  role: DataTypes.STRING,
};

export default categories;