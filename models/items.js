import {DataTypes} from 'sequelize';
import app from '../conf/app.js';

const items = userModel => ({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  storeId: {
    type: DataTypes.UUID,
    references: {
      model: userModel,
      allowNull: false,
    },
  },
  categoryId: {
    type: DataTypes.UUID,
    references: {
      model: 'categories',
      allowNull: false,
    },
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  description: DataTypes.TEXT,
  topItem: DataTypes.ENUM('0', '1'),
  price: {
    type: DataTypes.INTEGER,
    get() {
      const discount = this.getDataValue('discount');
      const price = this.getDataValue('price');
      
      if (!discount) return price;
      else {
        let cal = discount / 100;
        return {
          discount: price * cal,
          actualPrice: price,
          price: price - (price * cal),
        };
      }
    }
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      max: app.discount,
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  available: DataTypes.ENUM('1', '0'),
  warranty: DataTypes.INTEGER,
  delivery: DataTypes.INTEGER,
  image: {
    type: DataTypes.TEXT,
    get () {
      let image = this.getDataValue('image');
      return (image) ? 
        image.split(',') : null;
    }
  },
});

export default items;