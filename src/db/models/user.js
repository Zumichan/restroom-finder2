'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
       isEmail: { msg: "must be a valid email address" }
     }
   },
   password: {
     type: DataTypes.STRING,
     allowNull: false
   }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
