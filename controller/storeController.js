var {Store, Users, Items, Address, Orders} = require('../conf/db.js');
var app = require('../conf/app.js');
var fs = require('fs');
var {uuidv7} = require('uuidv7');

const createStore = async (req, res) => {
  try {
    let userId = req.token.id,
    id = uuidv7(),
    name = app.validate(req.body.name),
    email = app.validate(req.body.email),
    phone = app.validate(req.body.phone),
    long = app.validate(req.body.long),
    lat = app.validate(req.body.lat),
    nationality = app.validate(req.body.country),
    avatar = (() => {
      let file = req.file;
      fs.rename (file.path, file.path + '.jpg', err => (err) ? console.log(err): null);
      return file.path + '.jpg';
    })();
    
    let store = await Store.create({
      userId, name, email, phone, id,
      long, lat, nationality, avatar
    });
    
    if (!store) res.json({code: 0, message: 'There is a store with the given name'});
    else res.json({code: 1, message: 'Store created successfully!'});
  } catch (e) {
    res.json({code: 0, message: 'There is a store with the given name! ' + e.message});
  }
};

const dashboard = async (req, res) => {
  let user = req.token;
  
  try {
    // get Items
    
    let items = await Store.findOne({
      where: {userId: user.id},
      include: Items
    });
    
    res.send(items);
  } catch (e) {
    res.send(e.message);
  }
};

const verify = async (req, res) => {
  try {
    
  } catch(e) {
    res.json({code: 0, message: 'Unknown error! ' + e.message});
  }
};

module.exports = {
  createStore, dashboard, verify
};