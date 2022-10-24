module.exports = app => {
    const users = require("../controllers/userController.js");
    const shops = require("../controllers/shopController.js");
    const sellers = require("../controllers/sellerController");
    const brands = require("../controllers/brandController");
    const categorys = require("../controllers/categoryController");
    const products = require("../controllers/productController");
    const orders = require("../controllers/orderController");
    const authJwt = require('./verifyJwtToken');
  
    var router = require("express").Router();
  
    // Create a new Tutorial
   // router.get("/",[authJwt.verifyToken], shops.show);
    

    router.get('/', (req, res) => {
      res.send('hello world')
    })

    router.post("/create-user",[authJwt.AdminRole], users.create);
    router.post("/user-login", users.login);
    router.post("/user-logout",[authJwt.verifyToken], users.logout);
    //////////////// Shop Section ///////////////////////////
    router.post("/add-shop",[authJwt.verifyToken], shops.create);
    router.get("/get-shops",[authJwt.verifyToken], shops.show);
      //////////////// Seller Section /////////////////////
    router.post("/add-seller",[authJwt.verifyToken,authJwt.SellerRole], sellers.create);
    router.get("/get-sellers",[authJwt.verifyToken], sellers.show);

    //////////////  Brand section /////////////////////////

    router.get("/get-brands",[authJwt.verifyToken], brands.show);
    router.post("/add-brand",[authJwt.verifyToken,authJwt.AdminRole], brands.create);

    //////////////  Brand section /////////////////////////

    router.get("/get-categorys",[authJwt.verifyToken], categorys.show);
    router.post("/add-category",[authJwt.verifyToken,authJwt.AdminRole], categorys.create);
    router.get("/brand-wise-category",[authJwt.verifyToken,authJwt.AdminRole], categorys.brandWiseCategory);
    

    /////////////////// product section //////////////////
    
    router.get("/get-products",[authJwt.verifyToken], products.show);
    router.post("/add-product",[authJwt.verifyToken,authJwt.AdminRole], products.create);    
    router.post("/selling-product",[authJwt.verifyToken,authJwt.AdminRole], products.sellingProduct);    
    router.get("/get-products-list",[authJwt.verifyToken], products.list);
    router.post("/add-more-product",[authJwt.verifyToken], products.addMoreProduct);



    /////////////////////////order section //////////////////////////////////////////
    router.post("/add-order",[authJwt.verifyToken], orders.create);
    router.get("/get-orders",[authJwt.verifyToken], orders.show);
    router.post("/update-order",[authJwt.verifyToken], orders.update);
    router.post("/add-customer-info",[authJwt.verifyToken], orders.addCustomerInfo);

    
    //router.get('/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], users.managementBoard);
    
    router.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], users.adminBoard);

    // Retrieve all Tutorials
    // router.get("/", tutorials.findAll);
  
    // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);
  
    // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use('/api/v1/', router);
  };