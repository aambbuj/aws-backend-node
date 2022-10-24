const db = require("../models");
const Products = db.products;
const OrderType = db.ordertype;
const OrderHistory = db.orderhistory;
const Invoice = db.invoice;
const productCategories = db.productCategories;
const Sellproducts = db.sellproducts;
const Sellproductsdetail = db.sellproductsdetail;
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

////////////////////////////////// Create and Save a new Category //////////////////////
exports.create = async (req, res) => {
  // Validate request
  if (req.body.shop_id && req.body.order_type) {
     try {
      let orderType = {
        name : req.body.order_type,
        shop_id : req.body.shop_id,
      }
      const result = await OrderType.findOrCreate({where:orderType,orderType});
      if (result) {
        let orderHistoryData = {
          product_name : req.body.product_name,
          ordertype_id  : result[0].id,
          customer_phone  : req.body.customer_phone,
          order_price  : req.body.order_price,
          advance_payment  : req.body.advance_payment,
          delivery_date  : req.body.delivery_date,
          status  : 1,
        }
        
      const orderResult = await OrderHistory.findOrCreate({where:orderHistoryData,orderHistoryData});

        res.json({ data: orderResult, msg: "Success", color: "success", status: true });
      }

    } catch (error) {
      res.json({ data: error, msg: "Internal Server Error !!", color: "danger", status: false });
    }
  } else {
    res.json({ data: result, msg: "Please create a shop !!", color: "warning", status: true });
  }
};

exports.show = async (req, res) => {
  try {
    const OrderTypesData =  await OrderType.findAll({
      include: [{model : OrderHistory}]
    });
    res.json({ data: OrderTypesData, msg: "Success", color: "success", status: true });

  } catch (error) {
    res.json({ data: error, msg: error, color: "danger", status: false });
  }
};


exports.update = async (req, res) => {
  try {
     const restlt = await OrderHistory.update({status:req.body.update_data},{where:{id : req.body.id}})
    const OrderTypesData =  await OrderHistory.findAll({where:{ordertype_id:req.body.ordertype_id}});

    res.json({ data: OrderTypesData, msg: "Success", color: "success", status: true });

  } catch (error) {
    res.json({ data: error, msg: error, color: "danger", status: false });
  }
};


exports.addCustomerInfo = async (req, res) => {
  try {
    // res.json({ data: req.body, msg: "Success", color: "success", status: true });

    const OrderTypesData =  await Invoice.create(req.body);

    res.json({ data: true, msg: "Success", color: "success", status: true });

  } catch (error) {
    res.json({ data: error, msg: error, color: "danger", status: false });
  }
};





