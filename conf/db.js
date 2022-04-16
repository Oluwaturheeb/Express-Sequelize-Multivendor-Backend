import {Sequelize, DataTypes} from 'sequelize';
import users from '../models/users.js';
import orders from '../models/orders.js';
import items from '../models/items.js';
import store from '../models/store.js';
import address from '../models/address.js';
import categories from '../models/categories.js';
import reviews from '../models/reviews.js';
import role from '../models/role.js';


const seq = new Sequelize('multi', 'root', 'password', {
  dialect: 'postgres',
  url: process.env.DATABASE_URL,
  host: 'localhost'
});

export const Users = seq.define('users', users);
export const Orders = seq.define('orders', orders);
export const Categories = seq.define('categories', categories);
export const Store = seq.define('store', store);
export const Items = seq.define('items', items(Store));
export const Address = seq.define('address', address);
export const Reviews = seq.define('reviews', reviews);
export const Roles = seq.define('roles', role);

// associations

// setup roles
Users.hasOne(Roles);
Roles.belongsTo(Users);

// store belongs to user
Users.hasOne(Store);
Store.belongsTo(Users);

// get items for stores
Store.hasMany(Items);
Items.belongsTo(Store);

// item has one category
Categories.hasOne(Items);
Items.belongsTo(Categories);

// get orders for sellers
Items.hasMany(Orders);
Orders.belongsTo(Items);

// review assoc
Items.hasMany(Reviews);
Reviews.belongsTo(Items);


//get orders
Users.hasMany(Orders);
Users.hasMany(Address);

// orders and addresses inverse
Orders.belongsTo(Users);
Address.belongsTo(Users);

// seq.sync({force: true});