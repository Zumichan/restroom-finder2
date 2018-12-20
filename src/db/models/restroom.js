'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restroom = sequelize.define('Restroom', {
    title: DataTypes.STRING,
    address: DataTypes.STRING,
    male: DataTypes.STRING,
    female: DataTypes.STRING,
    allgender: DataTypes.STRING,
    accessibility: DataTypes.STRING,
    facility: DataTypes.STRING
  }, {});
  Restroom.associate = function(models) {
    // associations can be defined here
  };
  return Restroom;
};
