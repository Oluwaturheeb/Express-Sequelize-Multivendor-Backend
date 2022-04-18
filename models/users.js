import DataTypes from 'sequelize';

const users = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  avatar: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  /* verify: {
    type: DataTypes.ENUM('NO', 'YES'),
    defaultValue: 'NO',
  },
  authType: {
    type: DataTypes.ENUM('LOCAL', 'SOCIAL'),
    defaultValue: 'LOCAL'
  } */
};

export default users;