const db = require("../models");
const User = db.users;
const Shop = db.shops;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
////////////////////////////////// Create Seller //////////////////////
exports.create = async (req, res) => {
   // res.send({status:true,success:req.body});
  const shopDetails = { email, name,password,phone } = req.body;
  // Validate request
  if (shopDetails.email && shopDetails.name,shopDetails.phone,shopDetails.password) {
    try {
      bcrypt.hash(shopDetails.password, saltRounds, function (err,   hash) {
        if (req.AuthUser) {
          shopDetails.role_id = req.role.id;
          shopDetails.assign_user = req.AuthUser.id;
        }
        User.create(shopDetails,shopDetails.password=hash).then(data => {
          const secretKey = jwt.sign({ email: data.email}, 'jwt-super-secret-key');
          res.json({ success:'Seller create successfull.',status:true,data:data,tokenType:'x-access-token',secret_key:secretKey});
        })
        .catch(err => {
          if (err.name === 'SequelizeConnectionRefusedError') {
            res.send({ warning:"Please Check Your Internet Connection .", status:false }); 
          }
          if (err.name === 'SequelizeUniqueConstraintError') {
            res.send({ warning:err.original.sqlMessage, status:false}); 
          }else{
            res.send({ error:'Internal Server Error',status:false }); 
          }
        });
      });
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
  if (req.AuthUser) {
    try {
      const result = await User.findAll({ where : {assign_user : req.AuthUser.id}});
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
