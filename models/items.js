import DataTypes from 'Sequelize';
// import Users from '../conf/db.js';

const items = userModel => ({
  id: {
    // type: DataTypes.UUID,
    //defaultValue: DataTypes.UUIDV4
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: userModel,
    },
    validate: {
      isInt: true,
    }
  },
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: {
    type: DataTypes.INTEGER,
    get() {
      const discount = this.getDataValue('discount');
      const price = this.getDataValue('price');
      if (discount) {
        let cal = discount / 100;
        return price - (price * cal);
      }
    }
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  available: DataTypes.ENUM('1', '0'),
  warranty: DataTypes.INTEGER,
  delivery: DataTypes.INTEGER,
  image: DataTypes.TEXT
});

export default items;