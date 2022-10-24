const db = require("../models");
const User = db.users;
const Shop = db.shops;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
////////////////////////////////// Create and Save a new Shop //////////////////////
exports.create = async (req, res) => {
  // res.send({status:true,success:req.AuthUser});
  const shopDetails = { shop_name, shop_phone } = req.body;
  // Validate request
  if (shopDetails.shop_name && shopDetails.shop_phone) {
    try {
      shopDetails.user_id = req.AuthUser.id;
      const result = await Shop.create(shopDetails);
      if (result) {
        await User.update({ shop_id: result.id }, { where: { id: req.AuthUser.id } });
       res.send({ msg: 'Shop create successfull.', color:'success', status: true });
      }
    } catch (err) {
      if (err.name === 'SequelizeConnectionRefusedError') {
        res.send({ msg: "Please Check Your Internet Connection .", color:'warning', status: false });
      }
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.send({ msg: 'Shop already created', color:'warning', status: false });
      } else {
        res.send({ msg: 'Internal Server Error', color:'danger', status: false });
      }
    }
  } else {
    res.send({
      warning: "Please fill all the fields.",
      status: false,
    });
  }
};


exports.show = async (req, res) => {
  // res.send({status:true,success:req.AuthUser});
  // Validate request
  if (req.AuthUser) {
    try {
      const result = await Shop.findAll({ where : {user_id : req.AuthUser.id}});
      if (result) {
       res.json({ data: result, color:'success', status: true });
      }
    } catch (err) {
        res.json({ msg: 'Internal Server Error', color:'danger', status: false });
    }
  } else {
    res.send({msg: "Please fill all the fields.",status: false,color:'warning'});
  }
};
