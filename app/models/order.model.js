module.exports = (sequelize, DataType) => {
  const Order = sequelize.define("order", {
    order_type: {
      type: DataType.STRING,
      allowNull: false,
      required: true
    },
    ordertype_id: {
      type: DataType.INTEGER,
      references: {
        model: 'ordertypes',
        key: 'id',
        deferrable: DataType.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    status: {
      type: DataType.BOOLEAN,
      defaultValue:false
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

  return Order;
};