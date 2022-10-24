const db = require("../models");
const Brand = db.brands;

////////////////////////////////// Create and Save a new User //////////////////////
exports.create = async (req, res) => {

  // Validate request

  if (req.body.brand_name) {
    try {


      const result = await Brand.findOrCreate({ where: { name: req.body.brand_name, shop_id: req.AuthUser.shop_id }, name: req.body.brand_name, shop_id: req.AuthUser.shop_id });
      if (result) {
        res.json({ data: result, msg: 'Success', color: 'success', status: true });
      }
    } catch (error) {
      res.json({ data: error, msg: 'Internal Server Error !!', color: 'danger', status: false });
    }
  } else {
    res.json({ data: result, msg: 'Fill the all filds !!', color: 'warning', status: true });
  }
};

exports.show = async (req, res) => {
  try {
    const result = await Brand.findAll({ where: { shop_id: req.AuthUser.shop_id } });
    if (result) {
      res.json({ data: result, msg: 'Success', color: 'success', status: true });
    }
  } catch (error) {
    res.json({ data: error, msg: 'Internal Server Error !!', color: 'danger', status: false });
  }
}

