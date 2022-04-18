import {DataTypes} from 'sequelize';

const role = {
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

export default role;