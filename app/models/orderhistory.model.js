module.exports = (sequelize, DataType) => {
  const OrderHistory = sequelize.define("orderhistory", {
    product_name: {
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
    order_id: {
      type: DataType.INTEGER,
      references: {
        model: 'orders',
        key: 'id',
        deferrable: DataType.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    customer_phone: {
      type: DataType.STRING,
      allowNull: false,
      required: false
    },
    order_price: {
      type: DataType.STRING,
      allowNull: false,
      required: false
    },
    advance_payment: {
      type: DataType.STRING,
      allowNull: false,
      required: false,
    },
    delivery_date: {
      type: DataType.STRING,
      allowNull: false,
      required: false
    },
    status: {
      type: DataType.BOOLEAN,
      defaultValue:false
    },
  });

  return OrderHistory;
};