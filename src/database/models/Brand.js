'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brands = sequelize.define('Brands', {
    name: DataTypes.STRING,
    rating: DataTypes.TINYINT
  }, {
    timestamps:false
  });
  Brands.associate = function(models) {
    //console.log(Brands)
    // associations can be defined here
    //Brands.hasMany(models.Article,{  //the name of the DB (article)
    //  as:'articles', //name table
    //  foreignKey:'brand_id' //name foreignKey, it's in the article table
    //});

  };
  return Brands;
};