import app from '../conf/app.js';
import {Items, Store, Orders, Reviews, Users, Categories} from '../conf/db.js';
import fs from 'fs';
import _ from 'lodash';
import {uuidv7} from 'uuidv7';

/**
 * Create new item
 * 
 * Required params
 * name
 * price
 * description 
 * stock
 * categoryId
 * 
 * Optional params
 * discount
 * available
 * warranty
 * image
 * 
 */
const create = async (req, res) => {
  try {
    let storeId = await getStoreId(req.token.id),
    name = app.validate(req.body.name),
    price = app.validate(req.body.price),
    discount = app.validate(req.body.discount || '0'),
    description = app.validate(req.body.description),
    available = app.validate(req.body.available || '1'),
    stock = app.validate(req.body.stock),
    warranty = app.validate(req.body.warranty || '0'),
    categoryId = app.validate(req.body.categoryId),
    image = (() => {
      if (!req.files) return 'images/items/default.png';
      return req.files.map(file => {
        fs.rename (file.path, file.path + '.jpg', err => (err) ? console.log(err): null);
        return file.path.substr(7) + '.jpg';
      }).join(',');
    })();
    
    if (!name && !price && !description && !categoryId && !stock) res.send({code: 0, message: 'Action required'});
    let newItem = await Items.create({
      id: uuidv7(),
      name, price, discount,
      description, warranty, available,
      storeId, stock, image
    });
    
    if (newItem) res.json({code: 1, message: 'Item has been created successfully!', item: newItem});
    else res.json({code: 0, message: 'Cannot create item!'});
  } catch (e) {
    res.status(500).send({code: 0, message: 'Product with the same name already exits!' + e.message});
  }
}

/**
 * Add discount to an item
 * 
 * Required params
 * id
 * discount
 */
 
const discount = async (req, res) => {
  try {
    let id = app.validate(req.body.id),
    discount = app.validate(req.body.discount);
    
    if (!id && !discount) res.json({code: 0, message: 'Action required'});
    else {
      let item = await Items.update({
        discount
      }, {
        where: {id}
      });
      
      if (!item) res.json({code: 0, message: 'Can not find the item specified!'});
      else res.json({code: 1, message: 'Discount has been added to this item!'});
    }
  } catch (e) {
    res.json({code: 0, message: 'Unknown error! ' + e.message});
  }
};

/**
 * Remove discount from an item
 * 
 * Required params
 * id
 */
 
const removeDiscount = async (req, res) => {
  try {
    let id = app.validate(req.body.id);
    
    if (!id) res.json({code: 0, message: 'Action required'});
    else {
      let item = await Items.update({
        discount: 0
      }, {
        where: {id}
      });
      
      if (!item) res.json({code: 0, message: 'Can not find the item specified!'});
      else res.json({code: 1, message: 'Discount has been removed fromthis item!'});
    }
  } catch (e) {
    res.json({code: 0, message: 'unknown error! ' + e.message});
  }
};

/**
 * Add discount to all items
 * 
 * Required params
 * discount
 */
 
const discountAll = async (req, res) => {
  try {
    let discount = app.validate(req.body.discount);
    
    if (!discount) res.json({code: 0, message: 'Action required'});
    else {
      let item = await Items.update({
        discount
      }, {
        where: {storeId: await getStoreId(req.token.id)}
      });
      
      if (!item) res.json({code: 0, message: 'Can not find the item specified!'});
      else res.json({code: 1, message: 'Discount has been added to all items!'});
    }
  } catch (e) {
    res.json({code: 0, message: 'unknown error! ' + e.message});
  }
};

/**
 * Remove discount from all Items
 * 
 * Required params
 * none
 */
 
const removeDiscountAll = async (req, res) => {
  try {
    let item = await Items.update({
      discount: 0
    }, {
      where: {storeId: await getStoreId(req.token.id)}
    });
    
    res.json({code: 1, message: 'Discount has been removed from all items!'});
  } catch (e) {
    res.json({code: 0, message: 'unknown error! ' + e.message});
  }
};

/**
 * Update item
 * 
 * Required params
 * name, price, description, stock, available, id
 */
 
const update = async (req, res) => {
  try {
    let name = app.validate(req.body.name),
    price = app.validate(req.body.price),
    description = app.validate(req.body.description),
    stock = app.validate(req.body.stock),
    available = app.validate(req.body.available),
    id = app.validate(req.body.id);
    
    if (!name && !price) res.json({code: 0, message: 'Action required'});
    else {
      let update = await Items.update({
        name, price, description, stock, available
      }, {
        where: {id}
      });
    }
  } catch (e) {}
};

/**
 * Delete an item
 * 
 * Required params
 * id
 */
 
const remove = async (req, res) => {
  try {
    let id = app.validate(req.body.id);
    
    if (!id) res.json({code: 0, message: 'Action required'});
    else {
      let item = await Items.delete({
        discount: 0
      }, {
        where: {id}
      });
      
      if (!item) res.json({code: 0, message: 'Can not find the item specified!'});
      else res.json({code: 1, message: 'Item has been removed!'});
    }
  } catch (e) {
    res.json({code: 0, message: 'Unknown error' + e.message});
  }
};

/**
 * Add an item to topitem listing
 * 
 * Required params
 * item, action
 */
 
const topItem = async (req, res) => {
  try {
    let item = app.validate(req.body.item),
    action = app.validate(req.body.action);
    
    if (!item && !action) res.json ({code: 0, message: 'Action required'});
    else {
      let update = await Items.update({topItem: action}, {
        where: {id: item}
      });
      
      if (!update) res.json ({code: 0, message: 'Cannot find the specified item!'});
      else res.json ({code: 1, message: 'Item updated successfully!'});
    }
  } catch (e) {
    res.json({code: 0, message: 'Unknown error!' + e.message});
  }
};

/**
 * Get details about an item
 * 
 * Required params
 * id
 */
 
const itemInfo = async (req, res) => {
  try {
    let id = app.validate(req.params.item);
    
    let getInfo = await Items.findOne({
      where: {id},
      include: [{
        model: Store,
        attributes: [['name', 'storeName'], ['id', 'storeId'], 'phone']
      }, {
        model: Categories,
        attributes: [['name', 'catName']]
      }, {
        model: Reviews,
        // where: {flag: 'approved'},
        include: Users
      }],
      // raw: true
    });
    if (!getInfo) res.sendStatus(404, 'Cannot find specified resource!');
    else res.json(getInfo);
  } catch (e) {
    res.status(404).json({code: 0, message: 'Cannot find specified resource!' + e.message});
  }
};

/**
 * Get real price of items added to cart
 * 
 * Required params
 * item array | uuid
 * 
 * Optional params
 * quantity array | int
 */
 
const cart = async (req, res) => {
  try {
    let item = req.body.item,
    q = req.body.quantity || 1;
    
    item = await Items.findAll({
      attributes: ['price', 'discount', 'name', 'id'],
      where: {id: item},
      raw: true
    });

    // calculate items with the quantity
    if (item.length > 1)
      var prices = _.sum(item.map(a => {
        let getQuantityIndex = req.body.item.indexOf(a.id)
        q = req.body.quantity[getQuantityIndex] || 1;
        return a.price * q;
      }));
    else 
      prices = item[0].price * q;

    res.json({item, prices});
  } catch (e) {
    res.status(500).send(e.message)
  }
};

/**
 * Order items from cart
 * 
 * Required params
 * item array | uuid
 * quantity, amount array | int, paymentType
 */
 
const orderItem = async (req, res) => {
  try {
    let user = req.token,
    item = req.body.item,
    getStoreId = await Items.findAll({
      attributes: ['storeId', 'id'],
      where: {id: item},
      raw: true,
    });
    
    if (typeof item == 'object') {
      item = item.map((i, index)  => ({
        id: uuidv7(),
        itemId: i,
        storeId: (() => {
          return getStoreId.filter(s => i !== s.id)[0].storeId;
        })(),
        userId: user.id,
        quantity: req.body.quantity[index],
        amount: req.body.amount[index],
      }));
      
      item = await Orders.bulkCreate(item);
    } else {
      item = await Orders.create({
        id: uuidv7(),
        itemId: item,
        userId: user.id,
        storeId: getStoreId.storeId,
        quantity: req.body.quantity,
        amount: req.body.amount
      });
    }
    
    if (!item) res.json({code: 0, message: 'Unknown error!'});
    else res.json({code: 1, message: 'Order has been created!'});
  } catch (e) {
    res.status(500).send({code: 0, message: e.message});
  }
}

/** 
 * Add reviews to item
 * 
 * Required params
 * itemId, content, rating
 */
 
const review = async (req, res) => {
  try {
    let userId = req.token.id,
    itemId = app.validate(req.body.item),
    content = app.validate(req.body.content),
    rating = app.validate(req.body.rating);

    let rev = await Reviews.create({
      id: uuidv7(), content, rating, userId, itemId
    });

    if (!rev) res.json({code: 0, message: 'Unknown error!'});
    else res.json({code: 1, message: 'Reviews has been submitted!'});
  } catch (e) {
    res.send(e.message);
  }
}

/**
 * Get storeId
 * 
 * Required params
 * userId
 */
 
const getStoreId = async userId => {
  let id = await Store.findOne({
    attributes: ['id'],
    where: {userId: userId},
    raw: true
  });

  return id.id;
}

export default {
  create, discount, removeDiscount, discountAll, removeDiscountAll,
  update, remove, topItem, itemInfo,
  cart, orderItem, review
};