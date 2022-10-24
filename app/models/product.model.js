module.exports = (sequelize, DataType) => {
  const Product = sequelize.define("product", {
    product_name: {
      type: DataType.STRING,
      allowNull: false,
      required: true
    },
    product_type: {
      type: DataType.STRING,
      allowNull: false,
      required: true
    },
    purchase_price: {
      type: DataType.STRING,
      allowNull: false,
      required: true
    },
    selling_price: {
      type: DataType.STRING,
      allowNull: false,
      required: true
    },

    disc_sell_price: {
      type: DataType.STRING,
      allowNull: false,
      required: true
    },
    total_pur_price: {
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
    brand_name: {
      type: DataType.STRING,
      allowNull: false,
      required: true
    },
    brand_id: {
      type: DataType.INTEGER,
      references: {
        model: 'brands',
        key: 'id',
        deferrable: DataType.Deferrable.INITIALLY_IMMEDIATE
      }
    },

    productcategory_id: {
      type: DataType.INTEGER,
      references: {
        model: 'productcategories',
        key: 'id',
        deferrable: DataType.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    category_name: {
      type: DataType.STRING,
      allowNull: false,
      required: true
    },
    category_id: {
      type: DataType.INTEGER,
      references: {
        model: 'categories',
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
  });

  return Product;
};