module.exports = (sequelize, DataType) => {
  const productCategory = sequelize.define("productCategory", {

    total_pur_price: {
      type: DataType.STRING,
      allowNull: false,
      required: true
    },
    category_name: {
      type: DataType.STRING,
      allowNull: false,
      required: true
    },
    shop_id: {
      type: DataType.INTEGER,
      references: {
        model: 'shops',
        key: 'id',
        deferrable: DataType.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    status: {
      type: DataType.BOOLEAN,
      defaultValue:false
    },
  });

  return productCategory;
};