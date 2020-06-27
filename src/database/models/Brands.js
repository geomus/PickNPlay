'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brands = sequelize.define('brands', {
    name: DataTypes.STRING,
    rating: DataTypes.TINYINT
  }, {
    timestamps:false
  });
  DB_brands.associate = function(models) {
    console.log(DB_brands)
    // associations can be defined here
    Brands.hasMany(models.Article,{  //put correctly the name of the DB (article)
      as:'articles', //name table
      foreignKey:'brand_id' //name foreignKey, it's in the article table
    });

  };
  return Brands;
};