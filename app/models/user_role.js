module.exports = (sequelize, DataType) => {
  const User_Role = sequelize.define("user_role", {
    user_id: {
      type: DataType.INTEGER,
      references: {
        model: 'users',
        key: 'id',
        deferrable: DataType.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    role_id: {
      type: DataType.INTEGER,
      references: {
        model: 'roles',
        key: 'id',
        deferrable: DataType.Deferrable.INITIALLY_IMMEDIATE
      }
    },
  });
  return User_Role;
};
