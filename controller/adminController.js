import * as DB from '../conf/db.js';
import app from '../conf/app.js';
import crypt from 'bcryptjs';
import {uuidv7} from 'uuidv7';

export const createAdmin = async (req, res) => {
  if (req.body.key !== 'create_Super_User') res.status(403).send({code: 0, message: 'Authorization failed'});
  else {
    try {
      let admin = DB.seq.transaction(async t => {
        let admin = await DB.Users.create({
          id: uuidv7(),
          name: 'Admin',
          email: 'admin@gmail.com',
          password: await crypt.hash('password', 10),
        }, {transaction: t});
        
        await DB.Roles.create({
          id: uuidv7(),
          userId: admin.id,
          role: 'ADMIN'
        }, {transaction: t});
        return admin;
      });
      
      res.send({code: 1, message: 'Account has been created!', user: admin});
    } catch (e) {
      res.json({code: 0, message: 'SUPER ADMIN account is already active!' + e.message});
    }
  }
};

export const dashboard = async (req, res) => {
  try {
    let ActiveStoreAndItemCounter = await DB.Store.findAll({
      attributes: ['name', 'id', 'userId', [
        DB.seq.fn('COUNT', DB.seq.col('store.name')), 'itemCount'
      ]],
      include: [{
        model: DB.Items,
        attributes: []
      }],
      where: {status: 'ACTIVE'},
      group: ['store.name', 'store.id']
    });
    let BlockedStoreAndItemCounter = await DB.Store.findAll({
      attributes: ['name', 'id', 'userId', [
        DB.seq.fn('COUNT', DB.seq.col('store.name')), 'itemCount'
      ]],
      include: [{
        model: DB.Items,
        attributes: []
      }],
      where: {status: 'BLOCKED'},
      group: ['store.name', 'store.id']
    }); 
    let customerBase = await DB.Roles.count({
      where: {role: 'USER'}
    });
    
    res.json({ActiveStoreAndItemCounter, BlockedStoreAndItemCounter, customerBase});
  } catch (e) {
    res.status(500).json({code: 0, message: e.message});
  }
};

export const blockUser = async (req, res) => {
  try {
    let body = req.body;
    if (!body.user && !body.action) res.status(412).send({code: 0, message: 'Action required!'});
    else {
      let up = DB.transaction(async t => {
        let action = app.validate(body.action),
          user = app.validate(body.user);
          
        let up = await DB.Users.update({status: action}, {
          where: {id: user}
        }, {transaction: t});
        
        if (body.role != 'USER')
          await DB.Store.update({status: action}, {
            where: user
          }, {transaction: t});
          
        return up;
      });
      let stat = (body.action == 'ACTIVE')? 'activated' : 'blocked';
      res.send({code: 1, message: 'Account has been '+ stat});
    }
  } catch (e) {
    res.status(500).send({code: 0, message: e.message});
  }
};

export const category = async (req, res) => {
  try {
    let name = req.body.name;
    
    if (!name) res.status(412).json({code: 0, message: 'Action required!'});
    else {
      let cat = await DB.Categories.create({
        id: uuidv7(),
        name: app.validate(name)
      });
      
      if (!cat) res.status(412).json({code: 0, message: 'Unknown error, try again!'});
      else res.send({code: 1, message: 'New category has been added!', cat});
    }
  } catch (e) {
    res.status(500).json({code: 0, message: e.message});
  }
};

export const removeCategory = async (req, res) => {
  try {
    let cat = req.body.cat;
    
    if (!cat) res.status(412).json({code: 0, message: 'Action required'});
    else {
      cat = await DB.Categories.destroy({
        where: {id: cat}
      });
      
      if (!cat) res.status(404).json({code: 0, message: 'Can not find the specified category!'});
      else res.json({code: 1, message: 'Category has been removed!'})
    }
  } catch (e) {
    res.status(500).json({code: 0, message: e.message});
  }
}