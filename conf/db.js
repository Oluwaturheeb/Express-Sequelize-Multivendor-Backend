import {
  Sequelize,
  DataTypes
} from 'sequelize';
import users from '../models/users.js';
import orders from '../models/orders.js';
import items from '../models/items.js';
import store from '../models/store.js';
import address from '../models/address.js';
import categories from '../models/categories.js';
import reviews from '../models/reviews.js';
import role from '../models/role.js';
import wishlist from '../models/wishlist.js';

export const seq = new Sequelize('multi', 'root', 'password', {
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
export const Wish = seq.define('wishlist', wishlist);

// associations
// setup roles
Users.hasOne(Roles);
Roles.belongsTo(Users);

// store belongs to user
Users.hasOne(Store);
Store.belongsTo(Users);

// get items and orders for stores
Store.hasMany(Items);
Store.hasMany(Orders);
Items.belongsTo(Store);
Orders.belongsTo(Store);

// item has one category
Categories.hasOne(Items);
Items.belongsTo(Categories);

// get orders for sellers
Items.hasMany(Orders);
Orders.belongsTo(Items);

// review assoc
Items.hasMany(Reviews);
Reviews.belongsTo(Items);
Users.hasOne(Reviews);
Reviews.belongsTo(Users);


//get orders
Users.hasMany(Orders);
Users.hasMany(Address);

// orders and addresses inverse
Orders.belongsTo(Users);
Address.belongsTo(Users);

// get wishes
Users.hasMany(Wish);
Wish.belongsTo(Users);
Items.hasOne(Wish);
Wish.belongsTo(Items);

export default seq;