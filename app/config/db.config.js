// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "",
//     DB: "shopdb",
//     dialect: "mysql",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   };

  module.exports = {
    HOST: "database-1.cu1tuhjzlwg9.ap-south-1.rds.amazonaws.com",
    PORT:"3306",
    USER: "admin",
    PASSWORD: "myShop12345",
    DB: "myshopdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };