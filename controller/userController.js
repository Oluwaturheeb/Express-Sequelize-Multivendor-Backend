import { uuidv7 } from 'uuidv7';
import app from '../conf/app.js';
import {Items, Address, Orders, Store, Users, Wish} from '../conf/db.js';

const profile = async (req, res) => {
  let user = req.user;
  let info = await Users.findAll({
    attributes: [],
    where: {id: user.id},
    include: [{
      model: Orders,
      include: [{
        model: Items,
        attributes: ['name', 'price', 'id', 'image'],
        include: [{
          model: Store,
          attributes: ['name','id']
        }],
      }]
    }, {
      model: Address
    }, {
      model: Wish,
      include: [{
        model: Items,
        attributes: ['name', 'id']
      }]
    }],
    limit: 30,
  });
  res.json({info, user});
};

const address = async (req, res) => {
  let {address, lga, city, state, country, info} = req.body;

  if (!address && !lga && !city) res.status(412).json({code: 0, message: 'All fields are required'});
  else {
    try {
      if (info) app.validate(info);
      let newAdd = await Address.create({
        id: uuidv7(), address: app.validate(address), userId: req.user.id,
        city: app.validate(city), lga: app.validate(lga), state, country, info
      });

      if (!newAdd) res.status(502).json({code: 0, message: 'Something broke!'});
      else res.json({code: 1, message: 'Address has been added!'});
    } catch (e) {
      res.status(500).send({code: 0, message: e.message})
    }
  }
}

const removeAddress = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id) res.status(412).json({code: 0, message: 'Action required!'});
    else {
      id = app.validate(id);

      let del = await Address.destroy({
        where: {id}
      });

      if (!del) res.status(404).json({code: 0, message: 'Can not find the resource you are looking for!'});
      else res.json({code: 0, message: 'Address has been removed!'});
    }
  } catch (e) {
    res.status(500).json({code: 0, message: e.message});
  }
};



const account = (req, res) => {
  
};

export default {
  profile, account, address, removeAddress
}