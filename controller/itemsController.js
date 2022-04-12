import app from '../conf/app.js';
import {Items} from '../conf/db.js';
import fs from 'fs';

export const create = async (req, res) => {
  try {
    let userId = app.validate(req.body.userId),
    name = app.validate(req.body.name),
    price = app.validate(req.body.price),
    discount = app.validate(req.body.discount),
    description = app.validate(req.body.description),
    available = app.validate(req.body.available),
    stock = app.validate(req.body.stock),
    warranty = app.validate(req.body.warranty),
    image = req.files.map(file => {
      fs.rename (file.path, file.path + '.jpg', err => (err) ? console.log(err): null);
      return file.path + '.jpg';
    }).join(',');
    
    let newItem = await Items.create({
      name, price, discount,
      description, warranty, available,
      userId, stock, image
    });
    
    if (newItem) res.json({code: 1, message: 'Item has been created successfully!', item: newItem});
    else res.json({code: 0, message: 'Cannot create item!'});
  } catch (e) {
    res.status(500).send(e.message);
  }
}
export const discount = (req, res) => {
  
}
export const discountAll = (req, res) => {
  
}
export const removeDiscount = (req, res) => {
  
}
export const removeDiscountAll = (req, res) => {
  
}
export const update = (req, res) => {
  
}
export const remove = (req, res) => {
  
}