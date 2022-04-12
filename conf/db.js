import {Sequelize, DataTypes} from 'Sequelize';
import users from '../models/users.js';
import orders from '../models/orders.js';
import items from '../models/items.js';

const seq = new Sequelize('multi', 'root', '', {
  dialect: 'postgres',
  url: process.env.DATABASE_URL,
  host: 'localhost'
});

export const Users = seq.define('users', users);
export const Orders = seq.define('orders', orders);
export const Items = seq.define('items', items(Users));

Users.hasMany(Items);
Users.hasMany(Orders);
Items.belongsTo(Users);
Items.hasMany(Orders);
Orders.belongsTo(Items);
Orders.belongsTo(Users);

// seq.sync({force: true});
export default seq;