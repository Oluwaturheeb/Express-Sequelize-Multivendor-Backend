import {DataTypes} from 'sequelize';
import app from '../conf/app.js';

const categories = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  description: DataTypes.TEXT,
  image: DataTypes.TEXT,
};

export default categories;