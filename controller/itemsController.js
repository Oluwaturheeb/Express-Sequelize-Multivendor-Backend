var app = require('../conf/app.js');
var {Items, Store, Orders} = require('../conf/db.js');
var fs = require('fs');
var sequelize = require('sequelize');
var _ = require('lodash');

const create = async (req, res) => {
  try {
    let getStore = await Store.findOne({
      attributes: ['id'],
      where: {
        userId: req.token.id
      },
      raw: true
    });
      
    let storeId = getStore.id,
    name = app.validate(req.body.name),
    price = app.validate(req.body.price),
    discount = app.validate(req.body.discount),
    description = app.validate(req.body.description),
    available = app.validate(req.body.available),
    stock = app.validate(req.body.stock),
    warranty = app.validate(req.body.warranty),
    image = req.files.map(file => {
      fs.rename (file.path, file.path + '.jpg', err => (err) ? console.log(err): null);
      return file.path + '.jpg';
    }).join(',');
    
    let newItem = await Items.create({
      name, price, discount,
      description, warranty, available,
      storeId, stock, image
    });
    
    if (newItem) res.json({code: 1, message: 'Item has been created successfully!', item: newItem});
    else res.json({code: 0, message: 'Cannot create item!'});
  } catch (e) {
    res.status(500).send(e.message);
  }
}

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
      else res.json({code: 1, message: 'Discount has been removed = require(this item!'});
    }
  } catch (e) {
    res.json({code: 0, message: 'unknown error! ' + e.message});
  }
};

const discountAll = async (req, res) => {
  try {
    let discount = app.validate(req.body.discount);
    
    if (!discount) res.json({code: 0, message: 'Action required'});
    else {
      let item = await Items.update({
        discount
      }, {
        where: {userId: token.id}
      });
      
      if (!item) res.json({code: 0, message: 'Can not find the item specified!'});
      else res.json({code: 1, message: 'Discount has been added to all items!'});
    }
  } catch (e) {
    res.json({code: 0, message: 'unknown error! ' + e.message});
  }
};

const removeDiscountAll = async (req, res) => {
  try {
    let userId = req.token.id;
    let item = await Items.update({
      discount: 0
    }, {
      where: {userId}
    });
    
    res.json({code: 1, message: 'Discount has been removed = require(all items!'});
  } catch (e) {
    res.json({code: 0, message: 'unknown error! ' + e.message});
  }
};

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

const itemInfo = async (req, res) => {
  try {
    let id = app.validate(req.params.item);
    
    let getInfo = await Items.findOne({
      //attributes: [''],
      where: {id},
      include: [{
        model: Store,
        attributes: [['name', 'storeName'], ['id', 'storeId'], 'phone']
      }],
      // raw: true
    });
    console.log(getInfo)
    if (!getInfo) res.sendStatus(404, 'Cannot find specified resource!');
    else res.json(getInfo);
  } catch (e) {
    res.status(404).json({code: 0, message: 'Cannot find specified resource!' + e.message});
  }
};

const cart = async (req, res) => {
  try {
    let item = req.body.item;
    
    item = await Items.findAll({
      attributes: ['price', 'discount', 'name'],
      where: {id: item},
      // raw:
    });
    if (item.length > 1) 
      var prices = _.sum(item.map(a => a.price.price));
    else 
      prices = item[0].price.price;
    res.json({item, prices});
  } catch (e) {
    res.status(500).send(e.message)
  }
};

const orderItem = async (req, res) => {
  try {
    let user = req.token,
    item = req.body.item;
    
    if (typeof item == 'object') {
      item = item.map(i => ({
        itemId: i,
        userId: user.id
      }));
      
      item = await Orders.bulkCreate(item);
    } else {
    item = await Orders.create(item = {
        itemId: item,
        userId: user.id
      });
    }
    
    if (!item) res.json({code: 0, message: 'Unknown error!'});
    else res.json({code: 1, message: 'Order has been created!'});
  } catch (e) {
    res.send(e.message);
  }
}

module.exports = {
  create, discount, removeDiscount, discountAll, removeDiscountAll,
  update, remove, topItem, itemInfo,
  cart, orderItem
};