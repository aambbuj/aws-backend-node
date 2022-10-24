module.exports = (sequelize, DataType) => {
  const Sellproduct = sequelize.define("sellproduct", {
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
    total_selling_amount: {
      type: DataType.STRING,
      allowNull: false,
      required: true
    },
    invoice: {
      type: DataType.STRING,
      allowNull: false,
      required: true
    },
    created_at: {
      type: DataType.STRING,
      allowNull: false,
      required: false
    },
    status: {
      type: DataType.BOOLEAN,
      defaultValue:false
    },
  });

  return Sellproduct;
};