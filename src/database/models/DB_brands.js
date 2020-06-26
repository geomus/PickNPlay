'use strict';
module.exports = (sequelize, DataTypes) => {
  const DB_brands = sequelize.define('brands', {
    name: DataTypes.STRING,
    rating: DataTypes.TINYINT
  }, {
    timestamps:false
  });
  DB_brands.associate = function(models) {
    console.log(DB_brands)
    // associations can be defined here
    DB_brands.hasMany(models.DB_Articles,{  //put correctly the name of the DB (article)
      as:'articles', //name table
      foreignKey:'brand_id' //name foreignKey, it's in the article table
    });

  };
  return DB_brands;
};