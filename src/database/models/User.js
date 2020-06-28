'use strict';
module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatar: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    isAdmin: DataTypes.INTEGER
  },{});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};