import {Store, Users, Items, Address, Orders, Roles} from '../conf/db.js';
import app from '../conf/app.js';
import fs from 'fs';
import {uuidv7} from 'uuidv7';

const createStore = async (req, res) => {
  try {
    let userId = req.user.id,
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

    await Roles.update({role: 'OWNER'}, {
      where: {userId}
    });
    
    if (!store) res.json({code: 0, message: 'There is a store with the given name'});
    else res.json({code: 1, message: 'Store created successfully!'});
  } catch (e) {
    res.json({code: 0, message: 'There is a store with the given name! ' + e.message});
  }
};

const dashboard = async (req, res) => {
  let user = req.user;
  
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
  try {
    let store = req.params.store;
    
    if (store) {
      store = app.validate(store);
      let storeInfoAndItems = await Store.findOne({
        where: {id: store, status: 'ACTIVE'},
        include: Items
      });

      if (!storeInfoAndItems) res.status(404).send({code: 0, message: 'Can not find the specified resources'});
      else res.json({store: storeInfoAndItems});
    } else {
      let stores = await Store.findAll();

      if (!stores) res.status(404).json({code: 0, message: 'Can not find the resource you are looking for!'});
      else res.json({stores, code: 1});
    }
  } catch (e) {
    res.status(500).json({code: 0, message: e.message})
  }
}

export default {
  createStore, dashboard, verify, getStore, 
};