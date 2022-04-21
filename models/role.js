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
      userId: 'users',
      allowNull: false
    }
  },
  role: {
    type: DataTypes.ENUM('USER', 'OWNER', 'MODERATOR', 'ADMIN'),
    defaultValue: 'USER',
    allowNull: false
  },
};

export default role;