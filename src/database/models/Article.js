'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Articles', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(20,2),
    discount: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    // brand_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    //provider_id: DataTypes.INTEGER,
    outstanding: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    serialNumber: DataTypes.INTEGER
  }, {
    tableName: 'articles'
  });
  // associations can be defined here
  Article.associate = function(models) {
   Article.belongsTo(models.Brands,{
     as:'brand',
     foreignKey: 'brand_id'
   });
    Article.belongsTo(models.Categories,{
      as:'category',
      foreignKey: 'category_id'
    });
  };
  return Article;
};