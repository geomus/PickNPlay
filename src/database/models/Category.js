'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Categories', {
    name: DataTypes.STRING,
    subcategoryId: DataTypes.INTEGER
  }, {
    tableName: 'categories',
    timestamps: false
  });
  Category.associate = function(models) {
    Category.hasMany(models.Articles,{
      as:'articles',
      foreignKey: 'category_id'
    })
    // associations can be defined here

  };
  return Category;
};