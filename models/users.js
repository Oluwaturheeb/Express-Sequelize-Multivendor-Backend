import DataTypes from 'sequelize';

const users = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    //defaultValue: DataTypes.UUIDV4
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  name: DataTypes.STRING,
  store: DataTypes.STRING,
  password: DataTypes.STRING,
  avatar: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  verified: DataTypes.ENUM('none', 'email', 'phone', '1'),
  long: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  lat: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: true,
  }
};

export default users;