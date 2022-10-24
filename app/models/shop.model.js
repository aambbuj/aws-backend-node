module.exports = (sequelize, DataType) => {
    const Shop = sequelize.define("shop", {
      shop_name: {
        type: DataType.STRING,
        allowNull:false,
        required:true
      },
      user_id: {
        type: DataType.INTEGER,
        allowNull:false,
        unique:true,
        required:true
      },
    });
  
    return Shop;
  };