'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Categories', {
    name: DataTypes.STRING,
    parent_id: DataTypes.INTEGER
  }, {
    tableName: 'categories',
    timestamps: false
  });
  // associations can be defined here
  Category.associate = function(models) {
    Category.hasMany(models.Articles,{
      as:'articles',
      foreignKey: 'category_id'
    })
  };
  return Category;
};