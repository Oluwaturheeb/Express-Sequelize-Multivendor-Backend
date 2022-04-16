import app from '../conf/app.js';
import {Items, Categories} from '../conf/db.js';

export default async (req, res) => {
  try {
    let cat = Category.findAll();
    let topItems = Items.findAll({
      where: {'topItem': 1},
      limit: 20,
      offset: 1,
    });
    
    let otherItems = Items.findAll({
      where: {topItem: null},
      offset: req.query.offset,
      limit: 30,
    });
    
    req.json({cat, topItems, otherItems});
  } catch (e) {
    res.send(e.message);
  }
};