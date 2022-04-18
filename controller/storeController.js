import {Store, Users, Items, Address, Orders, Roles} from '../conf/db.js';
import app from '../conf/app.js';
import fs from 'fs';
import {uuidv7} from 'uuidv7';

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
      if (!req.file) return 'images/store/default.png';
      fs.rename (file.path, file.path + '.jpg', err => (err) ? console.log(err): null);
      return file.path.substr(7) + '.jpg';
    })();
    
    let store = await Store.create({
      userId, name, email, phone, id,
      long, lat, nationality, avatar
    });

    await Roles.update({role: 'store'}, {
      where: {userId}
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

    let store = await Store.findOne({
      where: {userId: user.id},
      include: [{
        model: Items,
      }, {
        model: Orders
      }]
    });

    res.send(store);
  } catch (e) {
    console.log(e.message)
    res.send(e.message);
  }
};

const verify = async (req, res) => {
  try {
    
  } catch(e) {
    res.json({code: 0, message: 'Unknown error! ' + e.message});
  }
};

const getStore = async (req, res) => {
  let store = app.validate(req.params.store);

  let storeInfoAndItems = await Store.findOne({
    where: {id: store},
    include: Items
  });

  if (!storeInfoAndItems) res.status(404).send({code: 0, message: 'Can not find the specified resources'});
  else res.json({store: storeInfoAndItems});
}

export default {
  createStore, dashboard, verify, getStore
};