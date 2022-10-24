module.exports = (sequelize, DataType) => {
  const Category = sequelize.define("category", {
    name: {
      type: DataType.STRING,
      allowNull: false,
      required: true
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
  });

  return Category;
};