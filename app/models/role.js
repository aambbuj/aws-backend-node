module.exports = (sequelize, DataType) => {
  const Role = sequelize.define("role", {
    name: {
      type: DataType.STRING,
      allowNull:false,
      required:true,
      unique:true,
    },

  });
  const role = [
              {name : 'superAdmin'},
              {name : 'seller'},
              {name : 'admin'}
            ];
   //Role.bulkCreate(role);


  return Role;
};