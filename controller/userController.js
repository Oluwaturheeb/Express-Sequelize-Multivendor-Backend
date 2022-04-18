import {Items, Users, Orders, Store} from '../conf/db.js';

const profile = async (req, res) => {
  let user = req.token;
  let orders = await Orders.findAll({
    where: {userId: user.id},
    include: [{
      model: Items,
      attributes: ['name', 'price', 'id', 'image'],
      include: [{
        model: Store,
        attributes: ['name','id']
      }],
    }],
    limit: 30,
  });
  res.json({orders, user});
};

const account = (req, res) => {
  
};

const purchase = async (req, res) => {
  try {
    let user = req.token,
    item = app.validate(req.body.item);
    
    let getItem = await Items.findByPK(item);
  } catch (e) {
    res.send(e.message);
  }
}

export default {
  profile, account, purchase
}