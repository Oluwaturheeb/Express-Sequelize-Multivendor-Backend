var {Sequelize, DataTypes} = require('sequelize');
var users = require('../models/users.js');
var orders = require('../models/orders.js');
var items = require('../models/items.js');
var store = require('../models/store.js');
var address = require('../models/address.js');

const seq = new Sequelize('multi', 'root', '', {
  dialect: 'postgres',
  url: process.env.DATABASE_URL,
  host: 'localhost'
});

const Users = seq.define('users', users);
const Orders = seq.define('orders', orders);
const Items = seq.define('items', items(Users));
const Store = seq.define('store', store);
const Address = seq.define('address', address);

//relationship
// for sellers
Users.hasOne(Store);
Store.belongsTo(Users);
// get items for stores
Store.hasMany(Items);
Items.belongsTo(Store);

// get orders for sellers
Items.hasMany(Orders);
Orders.belongsTo(Items);

// Items.belongsTo(Users);

//get orders
Users.hasMany(Orders);
Users.hasMany(Address);

// orders and addresses inverse
Orders.belongsTo(Users);
Address.belongsTo(Users);

seq.sync({force: true});
module.exports = {
  Users, Orders, Items, Address, Store
};