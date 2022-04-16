import {DataTypes} from 'sequelize';
import {uuidv7} from 'uuidv7';

const address = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  address: DataTypes.TEXT,
  lga: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  country: DataTypes.STRING,
  info: DataTypes.TEXT,
};

export default address;