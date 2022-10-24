const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.roles = require("./role.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.user_roles = require("./user_role.js")(sequelize, Sequelize);
db.shops = require("./shop.model.js")(sequelize, Sequelize);
db.brands = require("./brand.model.js")(sequelize, Sequelize);
db.categorys = require("./category.model.js")(sequelize, Sequelize);
db.productCategories = require("./productCategory.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);
db.sellproducts = require("./sellproducts.model.js")(sequelize, Sequelize);
db.sellproductsdetail = require("./sellproductsdetails.model.js")(sequelize, Sequelize);
db.ordertype = require("./ordertype.model")(sequelize, Sequelize);
db.order = require("./order.model")(sequelize, Sequelize);
db.orderhistory = require("./orderhistory.model")(sequelize, Sequelize);
db.invoice = require("./invoice.model")(sequelize, Sequelize);


db.roles.belongsToMany(db.users, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId' });
db.users.belongsToMany(db.roles, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId' });

db.brands.hasMany(db.categorys, { foreignKey: 'brand_id' });
db.categorys.belongsTo(db.brands, { foreignKey: 'brand_id' });

db.productCategories.hasMany(db.products, { foreignKey: 'productcategory_id' });
db.products.belongsTo(db.productCategories, { foreignKey: 'productcategory_id' });

db.ordertype.hasMany(db.orderhistory, { foreignKey: 'ordertype_id' });
db.orderhistory.belongsTo(db.ordertype, { foreignKey: 'ordertype_id' });

db.sellproducts.hasMany(db.sellproductsdetail, { foreignKey: 'sell_products_id' });
db.sellproductsdetail.belongsTo(db.sellproducts, { foreignKey: 'sell_products_id' });

db.sellproductsdetail.belongsTo(db.shops, { foreignKey: 'shop_id' });
db.sellproductsdetail.belongsTo(db.users, { foreignKey: 'user_id' });

db.sellproducts.belongsTo(db.shops, { foreignKey: 'shop_id' });
db.sellproducts.belongsTo(db.users, { foreignKey: 'user_id' });

db.sellproductsdetail.belongsTo(db.products, { foreignKey: 'product_id' });


module.exports = db;