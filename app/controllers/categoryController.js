const db = require("../models");
const Brand = db.brands;
const Category = db.categorys;

////////////////////////////////// Create and Save a new Category //////////////////////
exports.create = async (req, res) => {

    // Validate request
   // res.json({ data: result,msg:'Success', color:'success', status: req.body });

    if (req.body.category_name && req.body.brand_id) {
      try {
        let caregoryObj = {name:req.body.category_name,brand_id : req.body.brand_id , brand_name : req.body.brand_name };
        const result  = await Category.findOrCreate( {where : caregoryObj,caregoryObj});
        if (result) {
          res.json({ data: result,msg:'Success', color:'success', status: true });
        }
      } catch (error) {
        res.json({ data: error, msg:'Internal Server Error !!', color:'danger', status: false });
      }
    }else{
      res.json({ data: result, msg:'Fill the all filds !!', color:'warning', status: true }); 
    }
};

exports.show = async ( req , res) => {
  try {
    const brandIds =  await Brand.findAll({
      where: {
        shop_id: req.AuthUser.shop_id
      },
      attributes: ['id'],
      raw : true
  })
  .then(ids => ids.map(ids => ids.id));
    
    const result = await Category.findAll({
      where: {brand_id: brandIds},
      attributes: ['id', 'name','brand_name'],
      include: [{
        model: Brand,
        attributes: ['id','shop_id','name'],
      }]
    });
    // const data = await result.getBrand();
    if (result) {
      res.json({ data: result,msg:'Success', color:'success', status: true });
    }
  } catch (error) {
    res.json({ data: error, msg:'Internal Server Error !!', color:'danger', status: false });
  }
}

exports.brandWiseCategory = async ( req , res) => {
  try {
    const brandWiseCategoryData =  await Brand.findAll({
      include: [{model : Category}]
    });
    res.json({ data: brandWiseCategoryData, color:'success', status: true });
  } catch (error) {
    res.json({ data: error, msg:'Internal Server Error !!', color:'danger', status: false });
  }
}

