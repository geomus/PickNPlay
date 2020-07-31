'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brands = sequelize.define('Brands', {
    name: DataTypes.STRING,
    rating: DataTypes.FLOAT
  }, {
    timestamps:false
  });
  Brands.associate = function(models) {
    // associations can be defined here
    Brands.hasMany(models.Articles,{
     as:'articles',
     foreignKey:'brand_id'
    });

  };
  return Brands;
};