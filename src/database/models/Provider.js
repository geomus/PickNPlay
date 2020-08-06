'use strict';
module.exports = (sequelize, DataTypes) => {
  const Providers = sequelize.define('Providers', {
    company: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    contact_number: DataTypes.INTEGER
  }, {});
  Providers.associate = function(models) {
    // associations can be defined here
  };
  return Providers;
};