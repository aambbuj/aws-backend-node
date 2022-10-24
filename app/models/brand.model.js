//const Category=require('./category.model');
module.exports = (sequelize, DataType) => {
  const Brand = sequelize.define("brand", {
    name: {
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
  });

  return Brand;


};

