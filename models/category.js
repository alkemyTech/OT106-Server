'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ News }) {
      this.hasMany(News);
    }
  };
  Category.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    deletedAt:"deletedAt",
    modelName: 'Category',
  });
  return Category;
};