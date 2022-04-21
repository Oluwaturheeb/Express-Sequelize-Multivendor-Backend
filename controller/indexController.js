import app from '../conf/app.js';
import {Items, Categories, Store, Users} from '../conf/db.js';

export default async (req, res) => {
  try {
    let cat = await Categories.findAll();
    let topItems = await Items.findAll({
      where: {'topItem': "1"},
      offset: (() => {
        let off = req.params.offset;
        if (off > 0) return off * app.itemsListing.topItems
      })(),
      limit: app.itemsListing.topItems,
    });
    
    let otherItems = await Items.findAll({
      include: [{
        model: Store,
        attributes:[],
        where: {status: 'ACTIVE'},
      }],
      where: {topItem: null}
    });
    
    res.json({cat, topItems, otherItems});
  } catch (e) {
    res.send(e.message);
  }
};