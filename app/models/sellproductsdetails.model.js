module.exports = (sequelize, DataType) => {
  const Sellproductsdetail = sequelize.define("sellproductsdetail", {
    product_id: {
      type: DataType.INTEGER,
      references: {
        model: 'products',
        key: 'id',
        deferrable: DataType.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    user_id: {
      type: DataType.INTEGER,
      references: {
        model: 'users',
        key: 'id',
        deferrable: DataType.Deferrable.INITIALLY_IMMEDIATE
      }
    },

    shop_id: {
      type: DataType.INTEGER,
      references: {
        model: 'shops',
        key: 'id',
        deferrable: DataType.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    sell_products_id: {
      type: DataType.INTEGER,
      references: {
        model: 'sellproducts',
        key: 'id',
        deferrable: DataType.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    selling_amount: {
      type: DataType.STRING,
      allowNull: false,
      required: true
    },
    qty: {
      type: DataType.STRING,
      allowNull: false,
      required: true
    },
    status: {
      type: DataType.BOOLEAN,
      defaultValue:false
    },
  });

  return Sellproductsdetail;
};