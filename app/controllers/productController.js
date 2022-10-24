const db = require("../models");
const Brand = db.brands;
const Shop = db.shops;
const User = db.users;
const Category = db.categorys;
const Products = db.products;
const productCategories = db.productCategories;
const Sellproducts = db.sellproducts;
const Sellproductsdetail = db.sellproductsdetail;
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

////////////////////////////////// Create and Save a new Category //////////////////////
exports.create = async (req, res) => {
  // Validate request

  if (req.body.shop_id) {
    try {
      let findObj = await productCategories.findOne({
        where:
        {
          category_name: req.body.category_name,
          shop_id: req.body.shop_id,
        }
      });
      if (!findObj) {
        findObj = await productCategories.create(req.body);
      }
      let reqObj = req.body;
      reqObj.productcategory_id = findObj.id;
      const result = await Products.findOrCreate({ where: reqObj, reqObj });
      if (result) {
        res.json({ data: result, msg: "Success", color: "success", status: true });
      }

    } catch (error) {
      res.json({ data: error, msg: "Internal Server Error !!", color: "danger", status: false });
    }
  } else {
    res.json({ data: result, msg: "Fill the all filds !!", color: "warning", status: true });
  }
};

exports.show = async (req, res) => {
  try {
    const productCategoryObj = await productCategories.findAll({
      include: [{ model: Products }]
    });
    res.json({ data: productCategoryObj, msg: "Fill the all filds !!", color: "warning", status: true });

  } catch (error) {
    res.json({ data: error, msg: error, color: "danger", status: false });
  }
};


exports.list = async (req, res) => {
  try {
    const productCategoryObj = await productCategories.findAll({
      include: [{ model: Products }]
    });
    res.json({ data: productCategoryObj, msg: "Fill the all filds !!", color: "warning", status: true });

  } catch (error) {
    res.json({ data: error, msg: error, color: "danger", status: false });
  }

};

exports.sellingProduct = async (req, res) => {
  if (req.body.sell_products.length > 0) {


    const dateObject = new Date();
    // current date
    // adjust 0 before single digit date
    const date = (`0 ${dateObject.getDate()}`).slice(-2);

    // current month
    const month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);

    // current year
    const year = dateObject.getFullYear();

    // current hours
    const hours = dateObject.getHours();

    // current minutes
    const minutes = dateObject.getMinutes();

    // current seconds
    const seconds = dateObject.getSeconds();

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    let currentDate = await `${date}-${month}-${year}T${hours}:${minutes}:${seconds}`;

    let number = await `AC-MYSHOP-${date}${month}${year}-enumber-` + Math.floor(Math.random() * `${date}${year}${minutes}${seconds}` + 10000) + 'Z'
    let invoiceNumber = await number.replace(/\s/g, '');
    let currentDateTime = await currentDate.replace(/\s/g, '');

    //  res.json({ msg: invoiceNumber, color:currentDate, status: false });

    try {
      let sellDataObj = {};
      sellDataObj = {
        user_id: req.AuthUser.id,
        invoice: invoiceNumber,
        created_at: currentDateTime,
        shop_id: req.AuthUser.shop_id,
        total_selling_amount: req.body.total_selling_price,
        status: true,
      };
      const sellPro = await Sellproducts.create(sellDataObj);
      const sellDetailsArr = [];
      const productUpdateArray = [];
      let details = req.body.sell_products;
      for (let i = 0; i < details.length; i++) {
        sellDetailsArr.push({
          product_id: details[i].id,
          user_id: req.AuthUser.id,
          shop_id: req.AuthUser.shop_id,
          sell_products_id: sellPro.id,
          selling_amount: details[i].selling_price,
          qty: 1,
          status: true,
        });
      }
      const sellProdetails = await Sellproductsdetail.bulkCreate(sellDetailsArr);
      if (sellProdetails) {
        for (let i = 0; i < details.length; i++) {
          let productDetails = await Products.findOne({ where: { id: details[i].id } });
          let updateqty = productDetails.qty - 1;
          let Updateamount = updateqty * details[i].selling_price;
          let data = { qty: updateqty, total_pur_price: Updateamount };
          const productResult = await Products.update(data, { where: { id: details[i].id } });
        }
      }

      const sellProData = await Sellproducts.findOne({
        where: { id: sellPro.id },
        include: [
          {
            model: Sellproductsdetail,
            include: Products,
          },
          {
            model: Shop,
          },
          {
            model: User,
          }
        ],

      });

      res.json({ data: sellProData, color: 'success', status: true });
    } catch (error) {
      console.log(error)
      res.json({ msg: error, color: "danger", status: false });
    }
  } else {
    res.json({ msg: "please select a product", color: "worning", status: false });
  }
};

exports.brandWiseCategory = async (req, res) => {
  try {
    const brandWiseCategoryData = await Brand.findAll({
      include: [{ model: Category }],
    });
    res.json({ data: brandWiseCategoryData, color: "success", status: true });
  } catch (error) {
    res.json({
      data: error,
      msg: "Internal Server Error !!",
      color: "danger",
      status: false,
    });
  }
};


exports.addMoreProduct = async (req, res) => {
  try {
    const product = await Products.findOne({ where: { id: req.body.product_id } });
    let qty = parseInt(req.body.qty) + parseInt(product.qty);
    const result = await Products.update({ qty: qty }, { where: { id: req.body.product_id } });
    res.json({ data: result, color: "success", status: true });
  } catch (error) {
    res.json({
      data: error,
      msg: "Internal Server Error !!",
      color: "danger",
      status: false,
    });
  }
};




