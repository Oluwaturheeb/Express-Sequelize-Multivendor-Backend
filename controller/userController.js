var {Items, Users, Orders} = require('../conf/db.js');

const profile = async (req, res) => {
  let user = req.token;
  let items = await Orders.findAll({
    where: {userId: user.id},
    include: [Items],
    limit: 30,
  },{raw: true});
  res.json({items, user});
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

module.exports = {
  profile, account, purchase
}