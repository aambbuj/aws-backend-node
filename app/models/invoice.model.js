module.exports = (sequelize, DataType) => {
    const Invoice = sequelize.define("invoice", {
      name: {
        type: DataType.STRING,
        allowNull:false,
        required:true
      },
      phone: {
        type: DataType.STRING,
        allowNull:false,
        unique:true,
        required:true
      },
      city: {
        type: DataType.STRING,
        allowNull:false,
        unique:true,
        required:true
      },
      state: {
        type: DataType.STRING,
        allowNull:false,
        unique:true,
        required:true
      },
      pin: {
        type: DataType.STRING,
        allowNull:false,
        unique:true,
        required:true
      },
      shop_id: {
        type: DataType.INTEGER,
        references: {
          model: 'shops',
          key: 'id',
          deferrable: DataType.Deferrable.INITIALLY_IMMEDIATE
        }
      },
      sellproduct_id: {
        type: DataType.INTEGER,
        references: {
          model: 'sellproducts',
          key: 'id',
          deferrable: DataType.Deferrable.INITIALLY_IMMEDIATE
        }
      },
      sell_user_id: {
        type: DataType.INTEGER,
        allowNull:true,
        references: {
          model: 'users',
          key: 'id',
          deferrable: DataType.Deferrable.SET_DEFERRED
        }
      },
      
    });
  
    return Invoice;
  };