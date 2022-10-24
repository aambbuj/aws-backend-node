module.exports = (sequelize, DataType) => {
    const User = sequelize.define("user", {
      name: {
        type: DataType.STRING,
        allowNull:false,
        required:true
      },
      email: {
        type: DataType.STRING,
        allowNull:false,
        required:true,
        isEmail:true,
        unique:true,
      },
      phone: {
        type: DataType.STRING,
        allowNull:false,
        unique:true,
        required:true
      },
      password: {
        type: DataType.STRING,
        allowNull:false,
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
      role_id: {
        type: DataType.INTEGER,
        allowNull:true,
        references: {
          model: 'roles',
          key: 'id',
          deferrable: DataType.Deferrable.SET_DEFERRED
        }
      },
      assign_user: {
        type: DataType.INTEGER,
        allowNull:true,
        references: {
          model: 'users',
          key: 'id',
          deferrable: DataType.Deferrable.SET_DEFERRED
        }
      },
      iflogin: {
        type: DataType.BOOLEAN,
        defaultValue:false
      }
      
    });
  
    return User;
  };