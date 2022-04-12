// imports
import crypt from 'bcryptjs';
import {Users} from '../conf/db.js';
import {mailJob} from './cron.js';
import app from '../conf/app.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  let email = app.validate(req.body.email),
  password = app.validate(req.body.password);
  
  if (!email && !password) res.sendStatus(403).json({message: 'Action required!'});
  else {
    try {
      let user = await Users.findOne({
        where: {
          email: email
        }
      });
      
      if (!user) res.setHeader('content-Type','application/json').status(400).send({code: 0, message: 'Credentials does not match any account!'});
      else {
        let check = await crypt.compare(password, user.password);
        
        if (!check) res.setHeader('content-Type','application/json').status(400).send({code: 0, message: 'Credentials does not match any account!'});
        else {
          let token = await app.signToken(user.id, process.env.JWTSECRET);
          res.send({code: 1, message: `Welcome, ${user.name}`, user: {token: token, ...user.dataValues}});
        }
      }
    } catch (e) {
      res.sendStatus(412).json({code: 0, message: e.message});
    }
  }
};

export const register = async (req, res) => {
  let {email, password, store, name} = req.body;
  
  if (!email && !password && !store && !name) res.sendStatus(403).json({message: 'Action required!'});
  else {
    try {
      let hashed = await crypt.hash(password, 10);
      
      let user = await Users.create({
        name: app.validate(name),
        email: app.validate(email),
        store: app.validate(store),
        password: hashed,
      });
      
      if (user) res.json({code: 1, message: 'Confirmation email sent!'});
      else res.json({code: 0, message: 'Cannot register user!'});
      let token = await app.signToken(user.dataValues.email);
      mailJob({url: token, ...user.dataValues}, 'confirmEmail');
    } catch (e) {
      res.status(412).json({code: 0,message: 'Email already exists!'})
    }
  }
};

export const confirmEmail = (req, res, next) => {
  try {
    let token = jwt.verify(req.params.data, process.env.JWTSECRET);
    let user = Users.update({verify: 'email'}, {where: {
      email: token
    }});
    
    if (user) res.send({code: 1, msg: 'Email address has been confirmed'});
    else res.status(404).json({code: 0, message: 'Cannot find account!'});
  } catch (e) {
    res.status(404).json({code: 0, message: 'Cannot find account!'});
  }
}

export const forgotPassword = async (req, res) => {
  let email = app.validate(req.body.email);
  
  if (!email) res.status(412).send({code: 0, message: 'Action required!'});
  else {
    try {
      let user = await Users.findOne({
        where: {
          email: email
        }
      });
      
      if (!user) res.status(400).send({code: 0, message: 'Credentials does not match any account!'});
      else {
        res.send({code: 1, message: 'Email has been sent!'});
        //mail
        let token = await app.signToken(user.dataValues.email);
        let job = mailJob({url: token, ...user.dataValues}, 'welcome');
      }
    } catch (e) {console.log(e)
      res.status(400).send({code: 0, message: e.message});
    }
  }
};

export const changePassword = async (req, res) => {
  let email = app.validate(req.body.email),
  password = app.validate(req.body.password);
  
  let stat = await updatePassword(email, password);
  
  if (stat.code !== 1) res.status(400).send(stat);
  else res.send(stat);
};

const updatePassword = async (email, password) => {
  if (!email && !password) return {message: 'Action required!', code: 0};
  
  try {
    let newPassword = await crypt.hash(password, 10);
    let user = await Users.update({password: newPassword},{
      where: {
        email: email
      }
    });
    
    if (!user) return {code: 0, message: 'Credentials does not match any account!'};
    
    //mail
    return {code: 1, message: 'Password has been updated!'};
  } catch (e) {
    return {code: 0, message: 'Unknown error ' + e.message};
  }
}